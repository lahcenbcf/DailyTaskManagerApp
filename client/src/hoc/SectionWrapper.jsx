const SectionWrapper = (Component) => function Hoc(){
    return (
    <div className="container px-4 w-full mx-auto">
            <Component />
    </div>)
}
export default SectionWrapper
