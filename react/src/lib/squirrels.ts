export type SquirrelType = "red" | "gray" | "black" | "white" | "brown";

export type Squirrel = {
  id: number;
  name: string;
  image: string;
  description: string;
  count: number;
  type: SquirrelType;
};

export const squirrels: Squirrel[] = [
  {
    id: 1,
    name: "Red Squirrel",
    image: "/images/red-squirrel.png",
    description: "The red squirrel is a small, agile squirrel with a reddish-brown coat and a bushy tail.",
    count: 10,
    type: "red",
  },
  {
    id: 2,
    name: "Gray Squirrel",
    image: "/images/gray-squirrel.png",
    description: "The gray squirrel is a medium-sized squirrel with a gray coat and a bushy tail.",
    count: 20,
    type: "gray",
  },
  {
    id: 3,
    name: "Black Squirrel",
    image: "/images/black-squirrel.png",
    description: "The black squirrel is a small, agile squirrel with a black coat and a bushy tail.",
    count: 30,
    type: "black",
  },
  {
    id: 4,
    name: "White Squirrel",
    image: "/images/white-squirrel.png",
    description: "The white squirrel is a small, agile squirrel with a white coat and a bushy tail.",
    count: 4,
    type: "white",
  },
  {
    id: 5,
    name: "Brown Squirrel",
    image: "/images/brown-squirrel.png",
    description: "The brown squirrel is a small, agile squirrel with a brown coat and a bushy tail.",
    count: 2,
    type: "brown",
  },
];
