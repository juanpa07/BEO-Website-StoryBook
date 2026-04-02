export interface TextProperties {
  text: string;
  color: string;
  fontSize:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'xs'
    | 'sm'
    | 'base'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  fontFamily: 'open-sans' | 'roboto' | 'montserrat' | 'dancing';
  fontStyle: 'normal' | 'italic';
  align: 'left' | 'center' | 'right';
  weight:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
}
