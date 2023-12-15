import { Input } from "./Input"

export const Header = () => {
    return(
        <header
            className="
                h-16
                bg-gray-100/50
                border-b-2 border-gray-200
                py-1
                px-5
                flex
                justify-between
                items-center

            "
        >
            <img 
                className="
                    w-28
                    h-16
                    object-contain
                "
                src="pokeapi_256.3fa72200.png"
            />
            <div className="flex gap-1">
                <Input />
            </div>
        </header>
    )
}