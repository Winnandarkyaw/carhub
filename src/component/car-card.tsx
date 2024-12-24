import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Package, Target, TypeOutline } from "lucide-react";
import Image from "next/image";

type CarCardType = {
  data: {
    title: string;
    brand: string;
    model: string;
    type: string;
    manufactureYear: number;
    price: number;
    status: string;
  };
};

const CarCard = ({ data }: CarCardType) => {
  return (
    <Card className="lg:col-span-4 sm:col-span-6 col-span-full border bg-gray-50 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl capitalize">{data.title}</CardTitle>
        <Badge>{data.status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[150px]">
          <Image src={"/placeholder.png"} alt="Image-Car-PlaceHolder" fill />
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col items-center">
            <span className="text-sm font-light capitalize">{data.brand}</span>
            <Target className="text-blue-500" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-light capitalize">{data.model}</span>
            <Package className="text-green-500" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-light capitalize">{data.type}</span>
            <TypeOutline className="text-red-500" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-light capitalize">
              {data.manufactureYear}
            </span>
            <Calendar className="text-fuchsia-600" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full rounded-full py-6">${data.price}</Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
