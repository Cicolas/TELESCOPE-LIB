export default function setRef<T>(ref: React.MutableRefObject<T | undefined>) {
    return (e: T) => {ref.current = e??undefined;};
}