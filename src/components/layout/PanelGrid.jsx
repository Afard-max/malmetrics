export const PanelGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12 pb-24 md:pb-6">
      {children}
    </div>
  );
};