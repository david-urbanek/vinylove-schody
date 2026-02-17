export const contactInfo = {
  phone: "+420 776 058 999",
  email: "info@vinylove-schody.cz",
  address: "Masná 5a, 602 00 Brno-střed",
  addressLink:
    "https://google.com/maps/place//data=!4m2!3m1!1s0x471295f8251dd369:0x19ce8727beddce54?sa=X&ved=1t:8290&ictx=111",
  socials: {
    facebook: "https://www.facebook.com/vinyloveschody",
    instagram: "https://www.instagram.com/vinyloveschody.cz/",
  },
};

export const CATEGORY_MAP: Record<string, { query: string; title: string }> = {
  // Floors
  "podlahy-click": {
    query: `*[_type == "floor" && category == "podlahy-click"]`,
    title: "Vinylové podlahy Click",
  },
  "podlahy-lepene": {
    query: `*[_type == "floor" && category == "podlahy-lepene"]`,
    title: "Lepené vinylové podlahy",
  },

  // Stairs
  "schody-bez-nosu": {
    query: `*[_type == "stair" && category == "schody-bez-nosu"]`,
    title: "Schody bez nosu",
  },
  "schody-s-nosem": {
    query: `*[_type == "stair" && category == "schody-s-nosem"]`,
    title: "Schody s nosem",
  },
  "schody-naslapy": {
    query: `*[_type == "stair" && category == "schody-naslapy"]`,
    title: "Nášlapy",
  },
  "schody-vetknute": {
    query: `*[_type == "stair" && category == "schody-vetknute"]`,
    title: "Vetknuté schody",
  },

  // Others
  "obvodove-listy": {
    query: `*[_type == "skirting"]`,
    title: "Obvodové lišty",
  },
  "prechodove-listy": {
    query: `*[_type == "transitionProfile"]`,
    title: "Přechodové lišty",
  },
  "zakonceni-u-steny": {
    query: `*[_type == "staircaseSokl"]`,
    title: "Zakončení u stěny",
  },
  lepidla: {
    query: `*[_type == "accessory" && type == "lepidla"]`,
    title: "Lepidla",
  },
  sterky: {
    query: `*[_type == "accessory" && type == "sterky"]`,
    title: "Stěrky",
  },
  penetrace: {
    query: `*[_type == "accessory" && type == "penetrace"]`,
    title: "Penetrace",
  },
};
