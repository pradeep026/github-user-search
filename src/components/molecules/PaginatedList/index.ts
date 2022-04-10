
/**
 * @Component PaginatedList
 *
 * Usage of PaginatedList component
 *
 * Ref to `PaginatedList` data type
 * ```
 *  <PaginatedList
 *      data={data ?? []}
        pageSize={50}
        renderItem={(treeItem, index) => {
            // ... render item as ReactElement
        }}
        onSelectItem={() => {
            // callback fn when an item is selected
        }} />
 * ```
 */

 export * from './PaginatedList';
