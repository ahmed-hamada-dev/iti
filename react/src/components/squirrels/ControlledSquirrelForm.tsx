import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
  image: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  count: z.number().int("Count must be an integer").min(0, "Stock cannot be negative"),
  type: z.enum(["red", "gray", "black", "white", "brown"]),
});

export type SquirrelFormData = z.infer<typeof formSchema>;

interface ControlledFormProps {
  initialData?: SquirrelFormData;
  onSubmit: (data: SquirrelFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export function ControlledSquirrelForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: ControlledFormProps) {
  const form = useForm<SquirrelFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      image: initialData?.image || "",
      description: initialData?.description || "",
      count: initialData?.count ?? 0,
      type: initialData?.type || "brown",
    },
  });

  const onSubmitForm = (data: SquirrelFormData) => {
    if (!data.image || data.image.trim() === "") {
      data.image = "/images/brown-squirrel.png";
    }
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="grid py-4 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="/images/brown-squirrel.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a squirrel type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="gray">Gray</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="brown">Brown</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Count</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value === "" ? 0 : e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-6 border-t border-border mt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Form>
  );
}
