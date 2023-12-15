// Card.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faDragon, faFire, faWorm, faQuestion, faRulerHorizontal, faLocationPin, faCircleDot, faFistRaised, faFeather, faTentArrowDownToLine, faBug, faGhost, faMountain, faCloud, faBrain, faSnowflake, faDroplet, faLeaf, faBolt, faEye, faStar, faQuestionCircle, faMoon } from "@fortawesome/free-solid-svg-icons"; 

type Props = {
  name: string;
  image: string;
  types: string[];
};

export const Card = ({ name, image, types }: Props) => {
  return (
    <div
      className={`
        h-60
        flex-1
        flex
        flex-col
        rounded-md 
        p-3
        mb-2
        ${getBackgroundColorClass(types[0])} 
        bg-opacity-75
      `}
    >
      <h5
        className="
          text-white
          font-semibold
          text-lg
        "
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h5>
      <div
        className="
          flex-1
          flex
          justify-between
          mt-5    
        "
      >
        <div className="flex items-center">
          {types.map((type, index) => (
            <span
              key={index}
              className={`
                w-8
                h-8
                p-2
                flex
                justify-center
                items-center
                rounded-full
                ${getIconColorClass(type)}
                mr-2
                bg-white
              `}
            >   
              <FontAwesomeIcon
                icon={getTypeIcon(type)}
              />
            </span>
          ))}
        </div>
        <div
          className={`
            flex
            justify-center
            items-center
            rounded-full
            w-1/2 h-full
            overflow-hidden
            ${getBackgroundColorClass(types[0])}
          `}
        >
          <img
            className="
              w-40
              h-40
              object-contain
              p-5
            "
            src={image}
            alt={`Pokemon ${name} image`}
          />
        </div>
      </div>
    </div>
  );
};

const getTypeIcon = (type: string): IconDefinition => {
  const typeIcons: Record<string, IconDefinition> = {
    normal: faCircleDot,
    fighting: faFistRaised,
    flying: faFeather,
    poison: faWorm,
    ground: faTentArrowDownToLine,
    rock: faMountain,
    bug: faBug,
    ghost: faGhost,
    steel: faRulerHorizontal,
    fire: faFire,
    water: faDroplet,
    grass: faLeaf,
    electric: faBolt,
    psychic: faBrain,
    ice: faSnowflake,
    dragon: faDragon,
    dark: faMoon,
    fairy: faStar,
    unknown: faQuestionCircle,
    shadow: faLocationPin,
  };
  return typeIcons[type] || typeIcons.unknown;
};

const getBackgroundColorClass = (type: string): string => {
    const typeColors: Record<string, string> = {
      normal: "bg-slate-500",
      fighting: "bg-red-500",
      flying: "bg-gray-700",
      poison: "bg-purple-400",
      ground: "bg-amber-500",
      rock: "bg-yellow-900",
      bug: "bg-green-500",
      ghost: "bg-purple-500",
      steel: "bg-gray-500",
      fire: "bg-orange-500",
      water: "bg-blue-500",
      grass: "bg-green-500",
      electric: "bg-yellow-500",
      psychic: "bg-pink-500",
      ice: "bg-teal-500",
      dragon: "bg-indigo-500",
      dark: "bg-gray-500",
      fairy: "bg-pink-500",
      unknown: "bg-gray-500",
      shadow: "bg-gray-600",
    };
    return typeColors[type] || typeColors.unknown;
  };

const getIconColorClass = (type: string): string => {
    const typeColors: Record<string, string> = {
        normal: "text-slate-500",
        fighting: "text-red-500",
        flying: "text-gray-700",
        poison: "text-purple-400",
        ground: "text-amber-500",
        rock: "text-yellow-900",
        bug: "text-green-500",
        ghost: "text-purple-500",
        steel: "text-gray-500",
        fire: "text-orange-500",
        water: "text-blue-500",
        grass: "text-green-500",
        electric: "text-yellow-500",
        psychic: "text-pink-500",
        ice: "text-teal-500",
        dragon: "text-indigo-500",
        dark: "text-gray-500",
        fairy: "text-pink-500",
        unknown: "text-gray-500",
        shadow: "text-gray-600",
    };
    return typeColors[type] || typeColors.unknown;
};
