import { useContext } from "react";
import { PlotsCaracContext } from "../../../config/Context";
import { Series } from "../../../core/domains/valuesObject/Series";

export interface PlotCaractProps {}

export const PlotCaract: React.FC<PlotCaractProps> = () => {
  const { plotCaract } = useContext(PlotsCaracContext);

  return (
    <>
      <h1 className="border">CARACTERISTIQUE</h1>
      {plotCaract && (
        <>
          <p>area : {plotCaract.area}</p>
          <p>longueur : {plotCaract.heigth}</p>
          <p>largeur : {plotCaract.width}</p>
          <p>cailloux : {plotCaract.pebbles}</p>
          <p>ph : {plotCaract.ph}</p>
          <p>planches Totals: {plotCaract.plank}</p>
          <div className="border-2">
            series :
            {plotCaract.series.map((serie: Series, index: number) => {
              return (
                <div key={index}>
                  <p>
                    Variété : {serie.vegetableVariety} / Planches:{" "}
                    {serie.nbPlank}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
