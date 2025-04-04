import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputField = ({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  required = false,
  disabled = false,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "password") {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && (
              <FormLabel>
                {label}{" "}
                <span className="text-destructive">{required && "*"}</span>
              </FormLabel>
            )}
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={placeholder}
                  {...field}
                  disabled={disabled}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {showPassword ? (
                    <EyeOff onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <Eye onClick={() => setShowPassword(!showPassword)} />
                  )}
                </div>
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}{" "}
              <span className="text-destructive">{required && "*"}</span>
            </FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              disabled={disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
