type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
  return <main>{children}</main>;
}
