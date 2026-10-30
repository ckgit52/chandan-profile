import { useForm } from "react-hook-form";
import { CircleAlert, LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { Block } from "@/components/block";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { NativeMagnetic } from "@/components/ui/native-magnetic-shadcnui";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};
const ContactContactFormSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onChange",
  });

  const formSubmit = async (data: ContactFormValues) => {
    const promise = fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error("Failed to send");
      }
      return res.json();
    });

    toast.promise(promise, {
      loading: "Sending message...",
      success: () => {
        reset();
        return "Message sent successfully 🚀";
      },
      error: "Something went wrong. Please try again.",
    });
  };
  return (
    <Block>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="mx-auto flex flex-col gap-6"
      >
        <InputContainer className="relative">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            {...register("name", {
              required: "Please enter your name!",
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]{3,}$/,
                message:
                  "Name must contain only letters and be at least 3 characters!",
              },
            })}
            className={
              errors.name
                ? "outline-2 outline-red-500 focus:ring-red-500 dark:focus:ring-red-500"
                : ""
            }
          />

          {errors.name && (
            <div className="absolute right-2 bottom-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleAlert
                    className={cn(
                      "size-4 text-neutral-600",
                      errors.name && "cursor-help text-red-500",
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent className="z-50">
                  <ErrorText>{errors.name.message}</ErrorText>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </InputContainer>
        <InputContainer className="relative">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            {...register("email", {
              required: "Please enter your email!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address!",
              },
            })}
            className={
              errors.email
                ? "outline-2 outline-red-500 focus:ring-red-500 dark:focus:ring-red-500"
                : ""
            }
          />

          {errors.email && (
            <div className="absolute right-2 bottom-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleAlert
                    className={cn(
                      "size-4 text-neutral-600",
                      errors.email && "cursor-help text-red-500",
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent className="z-50">
                  <ErrorText>{errors.email.message}</ErrorText>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </InputContainer>
        <InputContainer className="relative">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Your message here..."
            {...register("message", {
              required: "Please enter your message!",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters!",
              },
            })}
            className={
              errors.message
                ? "outline-2 outline-red-500 focus:ring-red-500 dark:focus:ring-red-500"
                : ""
            }
          />

          {errors.message && (
            <div className="absolute right-2 bottom-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleAlert
                    className={cn(
                      "size-4 text-neutral-600",
                      errors.message && "cursor-help text-red-500",
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent className="z-50">
                  <ErrorText>{errors.message.message}</ErrorText>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </InputContainer>

        <SubmitBtn disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderIcon className="animate-spin text-white" />
          ) : (
            "Submit"
          )}
        </SubmitBtn>
      </form>
    </Block>
  );
};

export default ContactContactFormSection;

export const InputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("flex flex-col gap-2", className)}
    >
      {children}
    </motion.div>
  );
};

export const Label = ({
  children,
  ...rest
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      {...rest}
      className="text-ink-secondary dark:text-ink-secondary-dark text-sm font-medium tracking-tight"
    >
      {children}
    </label>
  );
};

export const Input = ({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
}) => {
  return (
    <input
      {...rest}
      className={cn(
        "text-ink-primary dark:text-ink-primary-dark rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-neutral-600",
        className,
      )}
    />
  );
};

export const Textarea = ({
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
}) => {
  return (
    <textarea
      {...rest}
      rows={4}
      className={cn(
        "text-ink-primary dark:text-ink-primary-dark resize-none rounded-md border border-neutral-200 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-neutral-600",
        className,
      )}
    />
  );
};

export const ErrorText = ({ children }: { children?: React.ReactNode }) => {
  if (!children) return null;
  return <p className="text-xs">{children}</p>;
};

export function SubmitBtn({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <NativeMagnetic className="w-full">
      <Button
        type="submit"
        className={cn("w-full cursor-pointer", className)}
        {...props}
      >
        {children}
      </Button>
    </NativeMagnetic>
  );
}
