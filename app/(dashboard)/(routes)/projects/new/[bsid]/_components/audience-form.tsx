'use client'

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { use, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"   
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
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import { MarketSpace } from "@prisma/client";
import { cn } from "@/lib/utils";

const targetAudienceOptions = [
  {value : "Under 18 - Male"},
  {value : "Under 18 - Female"},
  {value : "18-24 - Male"},
  {value : "18-24 - Female"},
  {value : "25-34 - Male"},
  {value : "25-34 - Female"},
  {value : "35-44 - Male"},
  {value : "35-44 - Female"},
  {value : "45-54 - Male"},
  {value : "45-54 - Female"},
  {value : "55-64 - Male"},
  {value : "55-64 - Female"},
  {value : "65 or Above - Male"},
  {value : "65 or Above - Female"},
  {value : "all male"},
  {value : "all female"},
  {value : "under 18"},
  {value : "18-24"},
  {value : "25-34"},
  {value : "35-44"},
  {value : "45-54"},
  {value : "55-64"},
  {value : "65 or Above"},
];
interface targetAudienceProps {
    initialData: MarketSpace;
marketspaceId: string;
}

const formSchema = z.object({
  targetAudience: z.string({
    required_error: "Please select a target audience.",
  }),
})


export const TargetAudienceForm = ({
    initialData,
    marketspaceId
  }: targetAudienceProps) => {
    const [isEditing, setIsEditing] = useState(false);
  
    const toggleEdit = () => setIsEditing((current) => !current);
  
    const router = useRouter();
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        targetAudience: initialData?.targetAudience || ""
      },
    });

const { isSubmitting , isValid } = form.formState;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/marketspaces/${marketspaceId}`, values )
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
       targetAudience
       <Button onClick={toggleEdit} variant='ghost'>
        {isEditing ? (
            <>cancel</>
        ):(
            <>
            <Pencil className="h-4 w-4 mr-2"/>
             Edit targetAudience
        </>
        )}
        
       </Button>
     </div>
     {!isEditing ? (
          <p className={cn(
            "text-sm mt-2",
            !initialData.targetAudience && "text-slate-500 italic"
          )}>
            {initialData.targetAudience || "no targetAudience "}
          </p>
     ) : (
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
            >
                <FormField 
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Language</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? targetAudienceOptions.find(
                                  (targetAudience) => targetAudience.value === field.value
                                )?.value
                              : "Select target Audience"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Industry..." />
                          <CommandEmpty>No audience found.</CommandEmpty>
                          <CommandGroup>
                            {targetAudienceOptions.map((targetAudience) => (
                              <CommandItem
                                value={targetAudience.value}
                                key={targetAudience.value}
                                onSelect={() => {
                                  form.setValue("targetAudience", targetAudience.value)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    targetAudience.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {targetAudience.value}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the Industry that will be used in the dashboard.
                    </FormDescription>
                    <FormMessage />
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