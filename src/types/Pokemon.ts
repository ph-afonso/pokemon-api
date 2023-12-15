export type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      home: {
        front_default: string;
      };
      official_artwork: {
        front_default: string;
      };
    };
  };
  types: string[];
};
