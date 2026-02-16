import { z } from "zod";

export const formSchema = z.object({
  quantity: z.number().min(1),
});

export type FormType = z.infer<typeof formSchema>;
export type FieldName = keyof FormType;

export interface Hinges {
  label: string;
  id: string;
  name: FieldName;
  min?: number;
  max?: number;
}
