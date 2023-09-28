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


const uniqueSellingPropositionOptions = [
  { value :  "Quality Products"},
  { value :  "Affordable Prices"},
  { value :  "Innovative Technology"},
  { value :  "Exceptional Customer Service"},
  { value :  "Sustainability"},
  { value :  "Unique Design"},
  { value :  "Local Sourcing"},
  { value :  "Fast Shipping"},
  { value :  "Customization Options"},
  { value :  "Limited Editions"},
  { value :  "Exclusive Partnerships"},
  ];

interface uniqueSellingPropositionProps {
    initialData: MarketSpace;
marketspaceId: string;
}

const formSchema = z.object({
    uniqueSellingProposition : z.string({
    required_error: "Please select a location.",
  }),
})


export const UniqueSellingPropositionForm = ({
    initialData,
    marketspaceId
  }: uniqueSellingPropositionProps) => {
    const [isEditing, setIsEditing] = useState(false);
  
    const toggleEdit = () => setIsEditing((current) => !current);
  
    const router = useRouter();
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        uniqueSellingProposition: initialData?.uniqueSellingProposition || ""
      },
    });

const { isSubmitting , isValid } = form.formState;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/marketspaces/${marketspaceId}`, values)
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
       uniqueSellingProposition
       <Button onClick={toggleEdit} variant='ghost'>
        {isEditing ? (
            <>cancel</>
        ):(
            <>
            <Pencil className="h-4 w-4 mr-2"/>
             Edit USP
        </>
        )}
        
       </Button>
     </div>
     {!isEditing ? (
          <p className={cn(
            "text-sm mt-2",
            !initialData.uniqueSellingProposition && "text-slate-500 italic"
          )}>
            {initialData.uniqueSellingProposition || "no USP "}
          </p>
     ) : (
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
            >
                <FormField 
                control={form.control}
                name="uniqueSellingProposition"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>USP</FormLabel>
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
                              ? uniqueSellingPropositionOptions.find(
                                  (uniqueSellingProposition) => uniqueSellingProposition.value === field.value
                                )?.value
                              : "Select USP"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search USP..." />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {uniqueSellingPropositionOptions.map((uniqueSellingProposition) => (
                              <CommandItem
                                value={uniqueSellingProposition.value}
                                key={uniqueSellingProposition.value}
                                onSelect={() => {
                                  form.setValue("uniqueSellingProposition", uniqueSellingProposition.value)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    uniqueSellingProposition.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {uniqueSellingProposition.value}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the USP that will be used in the dashboard.
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