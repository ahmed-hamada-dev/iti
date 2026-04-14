import styles from "./squirrel-details.module.css";

export default function SquirrelDetailsSkeleton() {
  return (
    <article className={`${styles.container} animate-pulse`}>
      <div className={`${styles.imageWrapper} bg-gray-200`}>
        <div className="w-full h-full" />
      </div>

      <div className={styles.content}>
        <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-4" />
        <div className="h-6 bg-gray-200 rounded-full w-32 mb-8" />

        <div className="space-y-3 mb-10">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>

        <div className={`${styles.stockContainer} bg-gray-100 border-gray-200`}>
          <div className="w-full">
            <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-8 bg-gray-300 rounded w-48" />
          </div>
        </div>

        <div className="h-12 bg-gray-200 rounded-lg w-40" />
      </div>
    </article>
  );
}
