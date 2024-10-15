import {
    Card,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
  
const Shimmer=()=>{
    const Block=()=>{
        return(
      <Card className="border-solid border-gray-600 bg-gray-800 border-4 mt-10 h-96 w-96 flex flex-col">
        <CardBody className="flex-1 overflow-hidden ">
          <Typography variant="h5" color="blue-gray" className="mb-2 w-full h-6 bg-gray-600">
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2 w-full h-6 bg-gray-600">
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2 w-2/3 h-6 bg-gray-600">
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2 w-1/2 h-6 bg-gray-600">
          </Typography>
            
          <Typography variant="h5" color="blue-gray" className="mb-2 w-1/3 h-6 bg-gray-600">
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2 w-1/4 h-6 bg-gray-600">
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2 w-1/6 h-6 bg-gray-600">
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="h5" color="blue-gray" className="border- mb-2 w-1/4 h-8 bg-gray-600">
          </Typography>

        </CardFooter>
      </Card>)
    
    }
    return (
        <>
        <ul className="flex flex-wrap justify-center justify-evenly">
            
        {Array.from({ length: 27 }, (_, index) => <Block key={index} />)}
        </ul>
        </>
   
    );
};
export default Shimmer;