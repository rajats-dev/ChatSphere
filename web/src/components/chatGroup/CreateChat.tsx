"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/validation/chatSchema";
import { CHAT_GROUP } from "@/lib/apiAuthRoutes";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function CreateChat({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  const isLoading = isSubmitting;

  const onSubmit = async (payload: createChatSchemaType) => {
    try {
      const { data } = await axios.post(CHAT_GROUP, payload, {
        headers: {
          Authorization: user.token,
        },
      });
      if (data?.message) {
        setOpen(false);
        toast.success(data?.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.please try again!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Chat</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create your new Chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input
              placeholder="Enter chat title"
              {...register("title")}
              disabled={isLoading}
            />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input
              placeholder="Enter passcode"
              {...register("passcode")}
              disabled={isLoading}
            />
            <span className="text-red-400">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={isLoading}>
              {isLoading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
