export const ComposeCode = ({mapFunctions, filterFunction}: {mapFunctions: string[], filterFunction: string}) => {
    return (
        <div className="flex flex-col gap-2 w-fit">
            <h1>{`filter (`}</h1>
            <h1 className="ml-4">{`${filterFunction},`}</h1>
            <h1 className="ml-4">{`map (${mapFunctions.join(", ")})`}</h1>
            <h1>{`);`}</h1>
        </div>
    )
}