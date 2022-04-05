declare module '*.png' {
    const value: any;
    export = value;
 }
 
 declare module "*.svg" {
   import { ReactElement, SVGProps } from 'react';
   const content: (props: SVGProps<SVGElement>) => ReactElement;
   export default content;
 }