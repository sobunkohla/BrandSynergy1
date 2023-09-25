'use client'

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { use, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

interface TitleFormProps {
initialData: {
    businessName: string;
};
marketspaceId: string;
}

const formSchema = z.object({
    businessName: z.string().min(1, {
        message: "businessName is required",
    }),
});

export default function TitleForm({
    initialData,
    marketspaceId
}: TitleFormProps) {

    const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(prev => !prev);

const router = useRouter()
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
});

const { isSubmitting , isValid } = form.formState;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`api/marketspaces/${marketspaceId}`, values)
       toast.success("Market Space updated successfully");
       toggleEdit()
       router.refresh();
    } catch  {
      toast.error('something went wrong')
    }

   
  };
  return (
    <div className="mt-6 border bg-orange-100 rounded-md p-4 ">
     <div className="font-medium flex items-center justify-between">
        Market Space Title
       <Button onClick={toggleEdit} variant='ghost'>
        {isEditing ? (
            <>cancel</>
        ):(
            <>
            <Pencil className="h-4 w-4 mr-2"/>
             Edit title
        </>
        )}
        
       </Button>
     </div>
     {!isEditing ? (
        <p className="text-sm mt-2">
            {initialData.businessName}
        </p>
     ) : (
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
            >
                <FormField 
                control={form.control}
                name="businessName"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                            disabled={isSubmitting}
                            placeholder="e.g Branding Space" 
                            {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}

             />
             <div className="flex items-center gap-x-2 ">
                <Button 
                disabled={!isValid || isSubmitting} 
                type="submit"
                >
                    save
                </Button>
             </div>
        
            </form>
        </Form>
     )}
    </div>
  )
}