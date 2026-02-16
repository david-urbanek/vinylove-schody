import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import { FormType } from "./schema";

export interface QuantityProps {
  field: ControllerRenderProps<FormType>;
  max?: number;
  min?: number;
}

export const Quantity = ({ field, max, min }: QuantityProps) => {
  return (
    <div className="flex h-10 w-32 shrink-0 items-center justify-between overflow-hidden rounded-md border shadow-xs bg-muted/50">
      <Button
        onClick={() =>
          field.onChange(Math.max(min || 1, Number(field.value || 1) - 1))
        }
        variant="ghost"
        type="button"
        size="icon"
        className="size-10 shrink-0 rounded-none bg-background hover:bg-muted"
      >
        <Minus className="size-4" />
      </Button>
      <Input
        {...field}
        value={field.value ?? ""}
        onChange={(e) => {
          const raw = e.target.value;
          const parsed = parseInt(raw, 10);
          if (raw === "") {
            field.onChange("");
          } else if (!isNaN(parsed)) {
            field.onChange(parsed);
          }
        }}
        type="number"
        min={min ? min : 1}
        max={max ? max : 999}
        className="h-full w-full rounded-none border-x border-y-0 !bg-background px-1 text-center shadow-none focus-visible:ring-0"
      />
      <Button
        onClick={() =>
          field.onChange(Math.min(max || 999, Number(field.value || 1) + 1))
        }
        variant="ghost"
        type="button"
        size="icon"
        className="size-10 shrink-0 rounded-none bg-background hover:bg-muted"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
