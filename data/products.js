export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}


export const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/FallForestTrail.png",
    name: "AI Artwork - FallTrail",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 360,

  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/OilTanker.png",
    name: "AI Artwork - OilTanker",
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 360,

  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/RaceHorses.png",
    name: "AI Artwork - Race Horses",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 360,
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/2Birds.png",
    name: "AI Artwork - TwoBirds",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 360,

  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/Shark.png",
    name: "AI Artwork - Shark",
    rating: {
      stars: 4,
      count: 37
    },
    priceCents: 360,

  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/Planetfinger.png",
    name: "AI Artwork - Planetfinger",
    rating: {
      stars: 4.5,
      count: 175
    },
    priceCents: 360,

  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/products/Jungletrails.png",
    name: "AI Artwork - Jungletrails",
    rating: {
      stars: 4.5,
      count: 317
    },
    priceCents: 360,

  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/products/Tank.png",
    name: "AI Artwork - Tank",
    rating: {
      stars: 4.5,
      count: 144
    },
    priceCents: 360,
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "images/products/Tiger.png",
    name: "AI Artwork - Tiger",
    rating: {
      stars: 4.5,
      count: 305
    },
    priceCents: 360,

  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/products/Greenfield.png",
    name: "AI Artwork - Greenfield",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 360,

  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/products/Designer.png",
    name: "AI Artwork - Shelf Design",
    rating: {
      stars: 4.5,
      count: 235
    },
    priceCents: 360,
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "images/products/Polarbear.png",
    name: "AI Artwork - Polarbear",
    rating: {
      stars: 4.5,
      count: 30
    },
    priceCents: 360,

  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/products/Aquabeach.png",
    name: "AI Artwork - Aquabeach",
    rating: {
      stars: 4.5,
      count: 562
    },
    priceCents: 360,

  },
  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    image: "images/products/Shelfwhite.png",
    name: "AI Artwork - Shelfwhite",
    rating: {
      stars: 4.5,
      count: 232
    },
    priceCents: 360,

  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "images/products/Tigercharge.png",
    name: "AI Artwork - Tigercharge",
    rating: {
      stars: 4,
      count: 160
    },
    priceCents: 360,

  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "images/products/Abstractmulti.png",
    name: "AI Artwork - Abstractmulti",
    rating: {
      stars: 5,
      count: 846
    },
    priceCents: 360,

  },
  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    image: "images/products/Abstractgreen.png",
    name: "AI Artwork - Abstractgreen",
    rating: {
      stars: 4,
      count: 99
    },
    priceCents: 360,

  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/products/Sunset.png",
    name: "AI Artwork - Sunset",
    rating: {
      stars: 4,
      count: 215
    },
    priceCents: 360,

  },
  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    image: "images/products/Deesigner.png",
    name: "AI Artwork - Deesigner",
    rating: {
      stars: 4.5,
      count: 52
    },
    priceCents: 360,

  },
  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/products/Underthetree.png",
    name: "AI Artwork - Under the tree",
    rating: {
      stars: 4.5,
      count: 2465
    },
    priceCents: 360

  },
  {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
    image: "images/products/Cyclist.png",
    name: "AI Artwork - Cyclist",
    rating: {
      stars: 4.5,
      count: 119
    },
    priceCents: 360
  },
  {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
    image: "images/products/Redflowerfield.png",
    name: "AI Artwork - Red Flower Field",
    rating: {
      stars: 4,
      count: 326
    },
    priceCents: 360
  },
  {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    image: "images/products/Boatwaterfront.png",
    name: "AI Artwork - Boat Water Front",
    rating: {
      stars: 4.5,
      count: 2556
    },
    priceCents: 360
  },
  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    image: "images/products/Citybus.png",
    name: "AI Artwork - Citybus",
    rating: {
      stars: 4.5,
      count: 2286
    },
    priceCents: 360

  },
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    image: "images/products/Mountains.png",
    name: "AI Artwork - Mountains",
    rating: {
      stars: 4,
      count: 456
    },
    priceCents: 360

  },
  {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    image: "images/products/Pinkfield.png",
    name: "AI Artwork - Pinkfield",
    rating: {
      stars: 5,
      count: 83
    },
    priceCents: 360
  },
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    image: "images/products/Beigeflowerfence.png",
    name: "AI Artwork - Beige flower fence",
    rating: {
      stars: 4.5,
      count: 9017
    },
    priceCents: 360

  },
  {
    id: "1c079479-8586-494f-ab53-219325432536",
    image: "images/products/Backlakeview.png",
    name: "AI Artwork - Back lakeview",
    rating: {
      stars: 4,
      count: 229
    },
    priceCents: 360
  },
  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    image: "images/products/Boatdocks.png",
    name: "AI Artwork - Boatdocks",
    rating: {
      stars: 3.5,
      count: 42
    },
    priceCents: 360
  },
  {
    id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    image: "images/products/BackyardLakeview.png",
    name: "AI Artwork - Backyard Lakeview",
    rating: {
      stars: 4.5,
      count: 511
    },
    priceCents: 360
  },
  {
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    image: "images/products/Barnwindmill.png",
    name: "Ai Artwork - Barn windmill",
    rating: {
      stars: 4.5,
      count: 130
    },
    priceCents: 360
  },
  {
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
    image: "images/products/Thefarm.png",
    name: "AI Artwork - Thefarm",
    rating: {
      stars: 4.5,
      count: 248
    },
    priceCents: 360

  },
  {
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    image: "images/products/Pinktree.png",
    name: "AI Artwork - Pinktree",
    rating: {
      stars: 4.5,
      count: 117
    },
    priceCents: 360
  },
  {
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    image: "images/products/Beigeflowerfence2.png",
    name: "AI Artwork - Beigeflowerfence2",
    rating: {
      stars: 4,
      count: 126
    },
    priceCents: 360
  },
  {
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
    name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
    rating: {
      stars: 4.5,
      count: 1211
    },
    priceCents: 2250,
    keywords: [
      "coffeemakers",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
    image: "images/products/blackout-curtains-black.jpg",
    name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
    rating: {
      stars: 4.5,
      count: 363
    },
    priceCents: 3099,
    keywords: [
      "bedroom",
      "home"
    ]
  },
  {
    id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
    image: "images/products/cotton-bath-towels-teal.webp",
    name: "100% Cotton Bath Towels - 2 Pack, Light Teal",
    rating: {
      stars: 4.5,
      count: 93
    },
    priceCents: 2110,
    keywords: [
      "bathroom",
      "home",
      "towels"
    ]
  },
  {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    image: "images/products/knit-athletic-sneakers-pink.webp",
    name: "Waterproof Knit Athletic Sneakers - Pink",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 3390,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "womens"
    ]
  },
  {
    id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
    image: "images/products/countertop-blender-64-oz.jpg",
    name: "Countertop Blender - 64oz, 1400 Watts",
    rating: {
      stars: 4,
      count: 3
    },
    priceCents: 10747,
    keywords: [
      "food blenders",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
    image: "images/products/floral-mixing-bowl-set.jpg",
    name: "10-Piece Mixing Bowl Set with Lids - Floral",
    rating: {
      stars: 5,
      count: 679
    },
    priceCents: 3899,
    keywords: [
      "mixing bowls",
      "baking",
      "cookware",
      "kitchen"
    ]
  },
  {
    id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
    image: "images/products/kitchen-paper-towels-30-pack.jpg",
    name: "2-Ply Kitchen Paper Towels - 30 Pack",
    rating: {
      stars: 4.5,
      count: 1045
    },
    priceCents: 5799,
    keywords: [
      "kitchen",
      "kitchen towels",
      "tissues"
    ]
  },
  {
    id: "bc2847e9-5323-403f-b7cf-57fde044a955",
    image: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
    name: "Men's Full-Zip Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 3157
    },
    priceCents: 2400,
    keywords: [
      "sweaters",
      "hoodies",
      "apparel",
      "mens"
    ]
  }
];