import { useContext } from "react";
import { plotActifContext } from "../../../config/Context";
import { Series } from "../../../core/domains/valuesObject/Series";

export interface plotActifProps {}

export const PlotCaract: React.FC<plotActifProps> = () => {
  const { plotActif } = useContext(plotActifContext);

  return (
    <>
      <h1 className="border">CARACTERISTIQUE</h1>
      {plotActif && (
        <>
          <p>area : {plotActif.area}</p>
          <p>longueur : {plotActif.heigth}</p>
          <p>largeur : {plotActif.width}</p>
          <p>cailloux : {plotActif.pebbles}</p>
          <p>ph : {plotActif.ph}</p>
          <p>planches Totals: {plotActif.plank}</p>
          <div className="border-2">
            series :
            {plotActif.series.map((serie: Series, index: number) => {
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
