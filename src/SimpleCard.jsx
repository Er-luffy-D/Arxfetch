import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
export function SimpleCard(props) {
  const {article} = props;
  
  return (
    <Card className="border-solid border-black-500 border-4 mt-10 h-96 w-full max-w-sm flex flex-col md:h-96 md:w-96">
      <CardBody className="flex-1 overflow-hidden">
        <Typography variant="h5" color="blue-gray" className="mb-2 text-base sm:text-lg md:text-xl">
          {article.title}
        </Typography>
        <Typography className="text-sm sm:text-base">
          {article.abstract.length > 150
            ? article.abstract.slice(0, 150) + "......"
            : article.abstract}
        </Typography>
        <Typography className="font-bold text-xs sm:text-sm md:text-base">
        {typeof article.date === "string" ? article.date.replace(",", " ") : article.date.toString().replace(",", " ")}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
      <a href={article.id} target="_blank" ><Button className="text-xs sm:text-sm md:text-base">Read More</Button></a>
      </CardFooter>
    </Card>
  );
}
