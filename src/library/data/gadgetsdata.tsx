export interface GadgetsItem {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  characteristics: string[];
  gallery: string[];
  tags: string[];
}

const GadgetsData: GadgetsItem[] = [
  {
    id: 1,
    name: "Keycap Puller",
    description: "Universal Keycap Puller",
    characteristics: ["Material: PLA", "Color: A elegir"],
    image: "https://media.printables.com/media/prints/1f9a9d88-2dac-4e47-823a-53d92cf34cbc/images/9808445_750f55ef-e2b5-4fdf-a0f6-3074765a5d06_1e58dbe8-4296-4f9f-9802-0a9876495451/thumbs/inside/1600x1200/webp/1.webp",
    price: 2,
    gallery: [
      "https://media.printables.com/media/prints/866d8b49-74c5-4b87-88da-d7c1069f0cd8/images/9808446_834a0573-15e4-43fe-af6a-cebf03bf86b5_06ff57d5-b502-4455-9e58-c8b6cb2aac3c/thumbs/inside/1600x1200/webp/2.webp",
    ],
    tags: ["Keycap", "PC"],
  },
  {
    id: 2,
    name: "Organizador portable para cables",
    description: "",
    characteristics: ["Material: PLA", "Color: A elegir"],
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749763628/20230826_102119_kbp1iy.webp",
    price: 3.99,
    gallery: [
      "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749763724/20230826_102224_khuuml.webp",
      "https://media.printables.com/media/prints/564262/images/4541799_657df715-4525-4a76-bfa1-eb84fa8d4dc3/thumbs/inside/1920x1440/jpg/20230829_134941.webp",
    ],
    tags: ["Cables", "Organizador", "Portable"],
  },
  {
    id: 3,
    name: "Cable Holder",
    description: "Soporte para cables",
    characteristics: ["Material: PLA", "Color: A elegir"],
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749764596/24432c02-cd3b-4191-b552-634e954254ac_ih0chd.webp",
    price: 2,
    gallery: [
    ],
    tags: ["Cables", "Organizador"],
  },
  {
    id: 4,
    name: "Soporte de bebidas",
    description: "Soporte para tus bebidas en forma de calavera, 0.5L ",
    characteristics: ["Material: PLA", "Color: Gris o Blanco"],
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749786954/img_20250407_43_hdtwes.webp",
    price: 7.50,
    gallery: ["https://media.printables.com/media/prints/dfab132f-e99c-43a7-9e0a-4f07e365a539/images/9444146_e6b2a2e7-c481-48b8-83c7-6f4b39828e92_3ed4dc6c-67fb-4a61-8931-191b14fc7b67/thumbs/inside/1920x1440/jpg/img_20250407_191108.webp",
      "https://media.printables.com/media/prints/432c9549-1c07-4dfe-acaf-0eacb9060313/images/9444145_888ed5a1-f144-4a14-b550-c555634dd456_f0763a0f-89f7-46ce-8f5d-6ec888d9ae25/thumbs/inside/1920x1440/jpg/img_20250407_190907.webp"
    ],
    tags: ["Bebida", "Soporte"],
  },
  {
    id: 5,
    name: "Soporte de bebidas",
    description: "Soporte para tus bebidas en forma de Dragón 12oz y 5L",
    characteristics: ["Material: PLA+", "Color: Gris o Blanco"],
    image: "https://media.printables.com/media/prints/82d857fe-d85f-4447-833e-1938fd5eb398/images/9918879_e02256b3-9869-4bb6-aeae-ae40ea42a27a_381b8665-0843-4544-88fd-782b3436b9a8/thumbs/inside/1920x1440/jpg/img_20250601_131600.webp",
    price: 7.50,
    gallery: ["https://media.printables.com/media/prints/4945705a-f429-42a3-a811-15b6703e28a9/images/9918882_bd73b900-eca5-4e6a-a75b-9fa46dce06f3_e9b97ccd-2659-45ca-b52d-8fb41e61a81a/thumbs/inside/1920x1440/jpg/05l.webp",
      "https://media.printables.com/media/prints/e5107dcb-dab5-43bf-80e5-cf59da5c49ee/images/9918883_3c386343-b9d1-444a-9b61-d98f216e68e5_afdb09bb-46fa-4f9e-9a07-a1ef4b509a93/thumbs/inside/1920x1440/jpg/12oz.webp"
    ],
    tags: ["Bebida", "Soporte"],
  },
  {
    id: 6,
    name: "Soporte para audífonos",
    description: "Soporte para tus audífonos con un diseño elegante y minimalista",
    characteristics: ["Material: PLA +", "Color: A elección"],
    image: "https://media.printables.com/media/prints/179001/images/1674865_778f6bf8-57c0-4844-afde-75cf03024cb3/thumbs/inside/1920x1440/jpg/headphone-stand2.webp",
    price: 7.50,
    gallery: ["https://media.printables.com/media/prints/179001/images/1674870_b756d2cc-9776-45b1-b1db-f0b30e3d517c/thumbs/inside/1920x1440/jpg/headphone-stand5.webp", "https://media.printables.com/media/prints/179001/images/1674865_778f6bf8-57c0-4844-afde-75cf03024cb3/thumbs/inside/1920x1440/jpg/headphone-stand2.webp"
    ],
    tags: ["PC", "Soporte"],
  },
  {
    id: 7,
    name: "Caja para juegos de Nintendo Switch",
    description: "Soporte para tus bebidas en forma de Dragón 12oz y 5L",
    characteristics: ["Material: PLA", "Color: Gris o Blanco"],
    image: "https://media.printables.com/media/prints/144864/images/1369643_fcb9ccbc-2d0f-40a2-8e02-27679ea9f311/thumbs/inside/1920x1440/png/marioblock2.webp",
    price: 7.50,
    gallery: ["",
      "https://media.printables.com/media/prints/144864/images/1369642_165a8d2c-4f85-43ce-b4d5-569ac48aa3ec/thumbs/inside/1920x1440/png/marioblock4.webp"
    ],
    tags: ["Almacenamiento", "Videojuegos"],
  },
  {
    id: 8,
    name: "Clip de reparación para cables de red RJ45",
    description: "Sujetadores de repuesto para cables de red (Ethernet). Se usan cuando la pequeña pestaña del cable se rompe. Solo tienes que colocarlos en el cable dañado, y así se asegura bien en el puerto sin salirse.",
    characteristics: ["Material: PLA", "Color: Gris o Blanco"],
    image: "https://media.printables.com/media/prints/1286059/images/9680179_ede8b042-23d6-43fa-990d-5fd543929627_c4a925f2-35aa-432f-a2d9-8cb0f1364c60/thumbs/inside/1920x1440/jpg/24d84f04e03bb9763d5ce10d36677db8_display_large_1286059.webp",
    price: 7.50,
    gallery: [
    ],
    tags: ["Repuesto", "PC"],
  },
  {
    id: 9,
    name: "Soporte regulable para tablets",
    description: "Diseñado para brindar comodidad y estabilidad, este soporte impreso en 3D permite ajustar el ángulo de visión de tu tablet según tus necesidades. Ligero, resistente y con un diseño moderno, ideal para estudiar, trabajar o ver tus series favoritas con las manos libres",
    characteristics: ["Material: PLA", "Color: A elegir"],
    image: "https://media.printables.com/media/prints/376433/images/3164351_6ceffff6-1ffc-44a8-bc01-d381123e8927/thumbs/inside/1920x1440/png/tabletstand1.webp",
    price: 7.50,
    gallery: [
    ],
    tags: ["Soporte"],
  },
  {
    id: 10,
    name: "Soporte de pared universal para mandos de videojuegos",
    description: "Compatible con los controles (PlayStation, Xbox, Nintendo, etc.)",
    characteristics: ["Material: PLA", "Color: A elegir"],
    image: "https://media.printables.com/media/prints/9777/images/79563_c99db65f-9ef2-40a0-a575-81970f4c260e/thumbs/inside/1920x1440/jpeg/00100dportrait_00100_burst20190622101315684_cove.webp",
    price: 7.50,
    gallery: ["https://media.printables.com/media/prints/9777/images/79564_975979d0-6b02-4629-a5a3-bf62b2ea886d/thumbs/inside/1920x1440/jpg/screenshot_1_9777.webp", "https://media.printables.com/media/prints/9777/images/79563_c99db65f-9ef2-40a0-a575-81970f4c260e/thumbs/inside/1920x1440/jpeg/00100dportrait_00100_burst20190622101315684_cove.webp"
    ],
    tags: ["Soporte", "Videojuegos"],
  },
  {
    id: 11,
    name: "Soporte de pared universal para mandos de videojuegos",
    description: "Diseñado para brindar comodidad y estabilidad, este soporte impreso en 3D permite ajustar el ángulo de visión de tu tablet según tus necesidades. Ligero, resistente y con un diseño moderno, ideal para estudiar, trabajar o ver tus series favoritas con las manos libres",
    characteristics: ["Material: PLA", "Color: A elegir"],
    image: "https://media.printables.com/media/prints/9777/images/79563_c99db65f-9ef2-40a0-a575-81970f4c260e/thumbs/inside/1920x1440/jpeg/00100dportrait_00100_burst20190622101315684_cove.webp",
    price: 7.50,
    gallery: ["https://media.printables.com/media/prints/9777/images/79564_975979d0-6b02-4629-a5a3-bf62b2ea886d/thumbs/inside/1920x1440/jpg/screenshot_1_9777.webp"
    ],
    tags: ["Soporte", "Videojuegos"],
  },
   {
    id: 12,
    name: "Soporte de pared universal para mandos de videojuegos",
    description: "Diseñado para brindar comodidad y estabilidad, este soporte impreso en 3D permite ajustar el ángulo de visión de tu tablet según tus necesidades. Ligero, resistente y con un diseño moderno, ideal para estudiar, trabajar o ver tus series favoritas con las manos libres",
    characteristics: ["Material: PLA", "Color: A elegir"],
    image: "https://media.printables.com/media/prints/9777/images/79563_c99db65f-9ef2-40a0-a575-81970f4c260e/thumbs/inside/1920x1440/jpeg/00100dportrait_00100_burst20190622101315684_cove.webp",
    price: 7.50,
    gallery: ["https://media.printables.com/media/prints/9777/images/79564_975979d0-6b02-4629-a5a3-bf62b2ea886d/thumbs/inside/1920x1440/jpg/screenshot_1_9777.webp"
    ],
    tags: ["Soporte", "Videojuegos"],
  },
];

export default GadgetsData;