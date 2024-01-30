"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";

import { PostType } from "@/components/ui/pet-card";

const formSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(2).max(50),
  imagesUrls: z.object({ url: z.string() }).array(),
  age: z.string().min(2).max(50),
  petType: z.string().min(2).max(50),
  lost: z.string().min(2).max(50),
  description: z.string().min(10).max(250),
  city: z.string().min(1),
  state: z.string().min(1),
  archived: z.boolean().nullable()
});


export default function PetEditForm({ initialData }: {initialData: PostType}) {

  const [loading, setLoading] = useState(false);
  const [venue, setVenue] = useState({city: "", state: ""})

  const age = ["Cachorro", "Grande", "adulto"];
  const petType = ["Perro", "Gato"];
  const lost = ["perdido", "adopcion"];

  useEffect(() => {
   /*  window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        (async function () {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
            );
            const data = await response.json();
            setLocation({ city: data.address.town, state: data.address.state });
          })();
        },
        (error) => console.log(error)
        ); */
      const city = localStorage?.getItem('city') as string
      const state = localStorage?.getItem('state') as string
      setVenue({city, state})
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { //typescript error
      ...initialData,
      lost: initialData.lost ? "perdido" : "adopcion",
      archived: initialData.archived !== null ? initialData.archived : undefined,
    },
  });
  //console.log("PARAMS:: ", params);
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Entreeeeeeeeeeeeeeeeeee", values);
    try {
      setLoading(true);
      
      console.log("Submit Values:: ", { ...values });
      const response = await axios.patch("/api/posts", {
        ...values,
        petId: initialData.id,
      }); //crear endpoint
      console.log(response.status);
      if (response.status === 200) {
        toast.success("Se actualizo la publicacion");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
      {venue.city && venue.state && (<FormLabel>Soy de {venue.city}, {venue.state}</FormLabel>)}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de tu mascota</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edad</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Select a category"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {age.map((age, index) => (
                    <SelectItem key={index} value={age}>
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="petType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Que animal es</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Select a category"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {petType.map((type, index) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imagesUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value.map((image) => image.url)}
                  disabled={loading}
                  onChange={(url) => field.onChange([...field.value, { url }])}
                  onRemove={(url) =>
                    field.onChange([
                      ...field.value.filter((current) => current.url !== url),
                    ])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Select a category"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {lost.map((situation, index) => (
                    <SelectItem key={index} value={situation}>
                      {situation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <Textarea placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit">Submit</Button>

      </form>
    </Form>
  );
}
