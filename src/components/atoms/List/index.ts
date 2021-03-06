
/**
 * @Component - SimpleList
 *
 * Usage of SimpleList component
 * SimpleList accepts any kind (Generic Type) of array as data.
 *
 * ```
 *  <SimpleList
 *      data={[]}
 *      onSelectItem={(item, index) => {
 *          // onClick list litem - callback function with selected item
 *      }}
 *      renderItem={(item, index) => ReactElement}
 *      />
 * ```
 */

 export { SimpleList } from './SimpleList';
 export type { SimpleListComponentProps } from './SimpleList';
