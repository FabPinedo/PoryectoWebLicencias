import { Injectable } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoChart } from 'src/app/Clases/info-chart';


@Injectable({
  providedIn: 'root'
})
export class GraficoService {
  private baseUrl = "http://localhost:8080/InfoUser";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  info:any[]
  constructor(private http: HttpClient) { }


onCreateSimpleColumnChart3D(data: any[], idchart: string){
  //Estilo de colores del chart
  am4core.useTheme(am4themes_spiritedaway);
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
//Aqui ingresa el id de div

//let chart = am4core.create(idstring, am4charts.XYChart3D);

// Create chart instance
let chart = am4core.create(idchart, am4charts.XYChart3D);

//Aqui se actualiza con la nueva data q ingresa q debe ser [x,y]
chart.data=data
// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "LOCAL";
categoryAxis.renderer.labels.template.rotation = 270;
categoryAxis.renderer.labels.template.hideOversized = false;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.verticalCenter = "middle";
categoryAxis.tooltip.label.rotation = 270;
categoryAxis.tooltip.label.horizontalCenter = "right";
categoryAxis.tooltip.label.verticalCenter = "middle";

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Locales";
valueAxis.title.fontWeight = "bold";

// Create series
let series = chart.series.push(new am4charts.ColumnSeries3D());
series.dataFields.valueY = "NRO_ACTIVOS";
series.dataFields.categoryX = "LOCAL";
series.name = "NRO_ACTIVOS";
series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
series.columns.template.fillOpacity = .8;

let columnTemplate = series.columns.template;
columnTemplate.strokeWidth = 2;
columnTemplate.strokeOpacity = 1;
columnTemplate.stroke = am4core.color("#FFFFFF");

columnTemplate.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
})

columnTemplate.adapter.add("stroke", function(stroke, target) {
  return chart.colors.getIndex(target.dataItem.index);
})

chart.cursor = new am4charts.XYCursor();
chart.cursor.lineX.strokeOpacity = 0;
chart.cursor.lineY.strokeOpacity = 0;


}

onCreateChartPizza(data:any,idChart:string){
  am4core.useTheme(am4themes_spiritedaway);
  am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create(idChart, am4charts.PieChart);

// Add data
chart.data =data

// Add and configure Series
let pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "NRO_ACTIVOS";
pieSeries.dataFields.category = "FAMILIA";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;
}


}

