import { type SchemaTypeDefinition } from "sanity";
import { floorType } from "./floorType";
import { patternType } from "./patternType";
import { stairType } from "./stairType";

import { skirtingType } from "./skirtingType";

import { transitionProfileType } from "./transitionProfileType";

import { accessoryType } from "./accessoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    floorType,
    patternType,
    stairType,
    skirtingType,
    transitionProfileType,
    accessoryType,
  ],
};
