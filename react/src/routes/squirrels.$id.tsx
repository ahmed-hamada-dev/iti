import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getSquirrel } from '#/lib/api'
import type { Squirrel } from '#/lib/squirrels'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/squirrels/$id')({
  component: SquirrelDetailsPage,
})

function SquirrelDetailsPage() {
  const { id } = Route.useParams()
  const [squirrel, setSquirrel] = useState<Squirrel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSquirrel() {
      try {
        const data = await getSquirrel(id)
        setSquirrel(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load squirrel')
      } finally {
        setLoading(false)
      }
    }
    fetchSquirrel()
  }, [id])

  if (loading) return <div className="p-16 text-center text-lg text-emerald-600 animate-pulse">Loading squirrel details...</div>
  if (error) return <div className="p-16 text-center text-red-500 font-bold">{error}</div>
  if (!squirrel) return <div className="p-16 text-center text-slate-500">Squirrel not found.</div>

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
      <div className="mb-8">
        <Link to="/squirrels">
          <Button variant="ghost" className="gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
            Back to Forest
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left side: Photo */}
        <div className="rounded-4xl overflow-hidden shadow-xl shadow-emerald-900/5 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 aspect-square relative group">
          <img 
            src={squirrel.image} 
            alt={squirrel.name} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-4xl pointer-events-none"></div>
        </div>
        
        {/* Right side: Content */}
        <div className="flex flex-col pt-4 md:pt-8">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
              {squirrel.type} Squirrel
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
            {squirrel.name}
          </h1>
          
          <div className="prose prose-lg prose-emerald dark:prose-invert mb-12">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              About this squirrel
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {squirrel.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                Current Population
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-emerald-600 dark:text-emerald-400">
                  {squirrel.count}
                </span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  in stock
                </span>
              </div>
            </div>
            
            <Button size="lg" className="rounded-2xl px-8 h-14 text-lg font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 w-full sm:w-auto">
              Adopt Squirrel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
