import "./Reports.css";
import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis,VictoryTheme } from 'victory';
import authService from "../../../Services/AuthService";
import config from "../../../Utils/Config";
import vacationsService from "../../../Services/VacationsService";
import VacationModel from "../../../Models/VacationModel";






function Reports(): JSX.Element {


    const [vacations, setVacations] = useState<VacationModel[]>(undefined);
    const [data, setData] = useState<{ destination: string, followers: number }[]>(undefined);
    const [myTickValues, setMyTickValues] = useState<number[]>(undefined);
    const [myTickFormat, setMyTickFormat] = useState<string[]>(undefined);

    useEffect((async () => {
        try {
            const user = await authService.getUser();
            if (user.role !== 2) {
                // this.setState({ redirect: "/login" });
                window.location.replace(config.loginPath);

            } else {
                const vacations = await vacationsService.getAllVacations();
                setVacations(vacations);
                const stateVacations: { destination: string, followers: number }[] = [];
                const myTickValues: number[] = [];
                const myTickFormat: string[] = [];
                vacations.forEach((v: any, index: number) => {
                    myTickValues.push(+v.followers);
                    myTickFormat.push(v.destination);
                    let obj = { destination: v.destination, followers: +v.followers };
                    if (obj.followers > 0 && obj.destination !== "") {
                        stateVacations.push(obj);
                    }
                    // stateVacations.push(obj);
                });
               


                const data = [                  
                ];

                setData(stateVacations);
                setMyTickValues(myTickValues);
                setMyTickFormat(myTickFormat);

            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }) as any, []);


    
    return (
        
        <div className="Reports">
            {data && <><h2>Followers per vacation</h2>

               
            <VictoryChart

                

                // domainPadding will add space to each side of VictoryBar to
                // prevent it from overlapping the axis
                animate={{
                    duration: 2020,
                    onLoad: { duration: 200 }
                }}
                    domainPadding={20}
                    padding={{ left: 50, top: 50, right: 10, bottom: 50 }}
                theme={VictoryTheme.material}
                >
            
                    <VictoryAxis
                       
                            // tickValues specifies both the number of ticks and where
                            // they are placed on the axis
                            tickValues={myTickValues}
                            tickFormat={myTickFormat}
                            
                            style={{ tickLabels: { angle: 0 } }}
                            />
                  <VictoryAxis
                dependentAxis
                // tickFormat={(x) => (`${x}`)}
                // tickFormat specifies how ticks should be displayed
                label="followers"
                />
                    <VictoryBar horizontal
                        barRatio={1}
                        cornerRadius={0} // Having this be a non-zero number looks good when it isn't transitioning, but looks like garbage when it is....
                        style={{ data: { fill: `purple`, fillOpacity: 0.7 } }}
                        alignment="start"
                        data={data}
                        x="destination"
                        y="followers"
                        labels={({ datum }) => datum.followers}

                />
            </VictoryChart>
            </>}

        </div>
    );
}

export default Reports;
