import { useDocumentTitle, useFormInput, useWindowWidth } from "./CustomHooks";

// export function CustomHookDemo() {
//   const width = useWindowWidth();

//   return (
//     <>
//       <section className="row">
//         <span>Width</span>
//         <input type="text" value={width} disabled />
//       </section>
//     </>
//   );
// }

export function CustomHookDemo() {
  const width = useWindowWidth();

  const titleProps = useFormInput("Heading");
  const designationProps = useFormInput("Software Engineer");
  useDocumentTitle(titleProps.value);

  return (
    <>
      <section className="row">
        <span>Title</span>
        <input {...titleProps} />
      </section>
      <section className="row">
        <span>Designation</span>
        <input {...designationProps} />
      </section>
      <section className="row">
        <span>Width</span>
        <input type="text" value={width} disabled />
      </section>
    </>
  );
}
