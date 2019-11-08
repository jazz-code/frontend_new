import React, {useState, useEffect} from 'react';
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import * as ChicagoPark from '../../chicago-parks.json'
import "./Map.styles.scss"
// import Axios from 'axios';
import AxiosWithAuth from '../AxiosWithAuth/axiosWithAuth'

export default function Map(props){
    // console.log('props in Map', props)
    const [viewport, setViewport] = useState({
        latitude: 13.5651,
        longitude: 104.7538,
        width: "100vw",
        height: "100vh",
        zoom: 8
    })

    const [selectedPump, setSelectedPump] = useState(null)

    const zoomInto = () => {
        console.log('checkkk', props.searchFiltered[0])
        // props.searchFiltered[0].map(place => {
        if(props.searchFiltered.length == 1){
            const searchedPlace = {
                latitude: props.searchFiltered[0].latitude,
                longitude: props.searchFiltered[0].longitude,
                width: "100vw",
                height: "100vh",
                zoom: 20
            }
            console.log('searchPlace one', searchedPlace)
            setViewport(searchedPlace)  
        }
        else if(props.searchFiltered.length > 1) {
            function avgCoordinate(arr){
                var totalLat = 0
                var totalLon = 0
                for (let i=0; i<arr.length; i++){
                    totalLat += arr[i].latitude
                    totalLon += arr[i].longitude
                }
                const avgLat = totalLat/arr.length;
                const avgLon = totalLon/arr.length;
                return [avgLat, avgLon]
            }
            const searchedPlace = {
                    latitude: avgCoordinate(props.searchFiltered)[0],
                    longitude: avgCoordinate(props.searchFiltered)[1],
                    width: "100vw",
                    height: "100vh",
                    zoom: 15
                }
            console.log('searchPlace many', searchedPlace)
            setViewport(searchedPlace)
            }
    }

    useEffect(() => {
        zoomInto()
    }, [props.searchFiltered])

    // console.log('viewport Out', viewport)

    useEffect(() => {
        const listener = e => {
            console.log('here', e)
            if (e.key === "Escape"){
                 
                setSelectedPump(null)
            }
        };
        console.log('listener', listener)
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener)
        }

     }, [ ])

    return <div>
        <ReactMapGl 
            {...viewport}
            mapboxApiAccessToken={"pk.eyJ1IjoiaHRyYW4yIiwiYSI6ImNrMmdmeWM2dDB1amkzY3AwNWgwNHRteXUifQ.jG0OQ6bMhr-sZYMkdj3H6w"}
            mapStyle="mapbox://styles/htran2/ck2gg912i09dt1cnhtuu1ar2u"
            onViewportChange = {viewport => {
                setViewport(viewport)
            }}
        >
            {props.sensors.map(sensor => {
                if (sensor.status == null){
                    return (<Marker
                        key={sensor.id}
                        latitude={sensor.latitude}
                        longitude={sensor.longitude}
                        >      
                        <img onClick = { event => {
                            event.preventDefault()
                            setSelectedPump(sensor)
                        }
                        }
                        class="location-icon" 
                        src="https://res.cloudinary.com/dfulxq7so/image/upload/v1572636578/Vector_hixhff.png" 
                        alt="location" />
               
                    </Marker>)
                }
                else if (sensor.status == 0){
                    return (<Marker
                        key={sensor.id}
                        latitude={sensor.latitude}
                        longitude={sensor.longitude}
                        >      
                        <img onClick = { event => {
                            event.preventDefault()
                            setSelectedPump(sensor)
                        }
                        }
                        class="location-icon" 
                        src="https://res.cloudinary.com/dfulxq7so/image/upload/v1572636578/Vector_hixhff.png" 
                        alt="location" />
               
                    </Marker>)
                }
                else if (sensor.status == 1){
                    return (<Marker
                        key={sensor.id}
                        latitude={sensor.latitude}
                        longitude={sensor.longitude}
                        >      
                        <img onClick = { event => {
                            event.preventDefault()
                            setSelectedPump(sensor)
                        }
                        }
                        class="location-icon" 
                        src="https://res.cloudinary.com/dfulxq7so/image/upload/v1573056729/Vector_q9ihvh.png" 
                        alt="location" />
               
                    </Marker>)
                }
                else {
                    return (<Marker
                        key={sensor.id}
                        latitude={sensor.latitude}
                        longitude={sensor.longitude}
                        >      
                        <img onClick = { event => {
                            event.preventDefault()
                            setSelectedPump(sensor)
                        }
                        }
                        class="location-icon" 
                        src="https://res.cloudinary.com/dfulxq7so/image/upload/v1573056725/Vector_1_xzgama.png" 
                        alt="location" />
               
                    </Marker>)
                }
            }
                
            )}

            {selectedPump ? (
                <Popup
                latitude={selectedPump.latitude}
                longitude={selectedPump.longitude}
                onClose={() => {
                    setSelectedPump(null)
                }}
                >
                    <div>
                        <h2>{selectedPump.country_name}</h2>
                        <p>{selectedPump.province_name}</p>
                    </div>
                </Popup>
            ) : null}

            

            {/* } */}
        </ReactMapGl>
        </div>;
}
