import { Typography, Box, Card, Container } from "@mui/material";
import "../../css/information.css";
const firstImage = require("../../assests/images/firstImage.png");
const secondImage = require("../../assests/images/02.png");
const thirdImage = require("../../assests/images/03.png");
const ans = require("../../assests/images/ans.png");
const nidhi = require("../../assests/images/nidhi.png");
const anju = require("../../assests/images/anju.png");

type TownerType = {
  name: string;
  image: any;
};

const data: TownerType[] = [
  { name: "Ans", image: ans },
  { name: "Nidhi", image: nidhi },
  { name: "Anju", image: anju },
];
const Information = () => {
  return (
    <Box>
      <img src={firstImage} className="shadow-2xl" width={"100%"} alt="Senior living hub" />
      <Container style={{ width: "80%", margin: "auto" }}>
        <Typography
          variant="h4"
          // className="m-6 mt-10 text-center"
          className="mt-14 mb-6 text-center text-primary-500"
          style={{
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Example shadow
            color: "#0055aa", // Example color
          }}
        >
          Vision & Mission
        </Typography>
        <Card className="shadow-lg">
          <div className="flex  flex-col md:flex-row">
            <img
              src={secondImage}
              className="w-full md:w-1/2"
              width={"50%"}
              alt="Senior living hub"
            />
            <Typography
              className="p-10 text-justify"
              variant="h6"
              sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}
            >
              <h2 className="text-3xl font-bold text-primary-500">
                Our Vision
              </h2>
              We want to hire the best people, provide the best training and
              education, and support them with the best leadership.
            </Typography>
          </div>

          <div className="flex  flex-col md:flex-row">
            <Typography
              className="p-10 text-justify"
              variant="h6"
              sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}
            >
              <h2 className="text-3xl font-bold text-primary-500">
                Our Mission
              </h2>
              Relationships are at the heart of Village life, and our team takes
              the time to know each resident so everyone can make the most out
              of each and every day.
            </Typography>
            <img
              src={thirdImage}
              className="w-full md:w-1/2"
              width={"50%"}
              alt="Senior living hub"
            />
          </div>
        </Card>
      </Container>



      <Container className="flex flex-col justify-between mt-10">
        <Typography  
         variant="h4"
          className="mb-6 font-bold text-center text-primary-500"
          style={{
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Example shadow
            color: "#0055aa", // Example color
          }}>
          Meet Our Leadership Team
        </Typography>

        <div className="flex justify-around items-center" style={{width:"80%", margin: "auto"}}>
          {data.map((item: TownerType) => (
            <div className="flex flex-col items-center p-4 m-2">
              <img
                src={item.image}
                className="rounded-full shadow-lg w-32 h-32 object-cover"
                alt={item.name}
              />
              <Typography
                className="text-lg font-semibold text-gray-700 mt-3"
                variant="h4"
              >
                {item.name}
              </Typography>
              <Typography className="text-sm text-black-500" variant="body1">
                CEO
              </Typography>
            </div>
          ))}
        </div>
      </Container>
    </Box>
  );
};

export default Information;
