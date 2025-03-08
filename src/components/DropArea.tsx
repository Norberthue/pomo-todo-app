
interface dropAreaForms {
    beforeId: string | null;
    darkMode: boolean;
    column: string;
}   

const DropArea = ({ beforeId , column, darkMode}:dropAreaForms) => {
    return (
        <div
        data-before={beforeId || "-1"}
        data-column={column}
        className={`my-0.5 h-0.5 w-full z-20 opacity-0 ${darkMode ? 'bg-[#676768]' : 'bg-[#676768]'}`}
    />
  )
}

export default DropArea
