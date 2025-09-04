import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FileUpload from "./FileUpload";
import { houseSchema } from "./schema/house-schema";
import AppFormField from "@/components/AppFormField";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createNewHouse } from "@/service/mockHouse";
import { useNavigate } from "react-router-dom";

const formData = [
  {
    name: "title",
    type: "text",
    placeholder: "Modern Downtown Apartment",
    label: "House Title",
  },
  {
    name: "location",
    type: "text",
    label: "Location",
    placeholder: "Downtown, City",
  },
  {
    name: "price",
    type: "number",
    label: "Rental Price",
    placeholder: "2,000",
  },
  {
    name: "bedrooms",
    type: "number",
    label: "No. of Bedrooms",
    placeholder: "2",
  },
  {
    name: "bathrooms",
    type: "number",
    label: "Bathrooms",
    placeholder: "2",
  },
  {
    name: "area",
    type: "number",
    label: "House Area (sq ft)",
    placeholder: "1200",
  },
];

const CreateNewHouseForm = () => {
  const [houseImages, setHouseImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(houseSchema),
    defaultValues: {
      title: "Modern Downtown Apartment",
      location: "Downtown, City",
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
    },
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: "createHouse",
    mutationFn: (values) => createNewHouse(values, houseImages),
    onSuccess: () => {
      navigate("/admin/dashboard");
    },
  });

  const onSubmit = (values) => mutate(values);

  return (
    <Form {...form}>
      <FileUpload setHouseImages={setHouseImages} />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-8 my-6"
      >
        {formData.map((data) => (
          <AppFormField
            key={data.name}
            form={form}
            name={data.name}
            label={data.label}
            inputType={data.type}
            inputPlaceholder={data.placeholder}
            isPending={isPending}
          />
        ))}
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="Type your message here."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-2" disabled={isPending}>
          Create House
        </Button>
      </form>
    </Form>
  );
};

export default CreateNewHouseForm;
