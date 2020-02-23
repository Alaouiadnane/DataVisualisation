// https://observablehq.com/@mbostock/the-impact-of-vaccines@258
import define1 from "./a33468b95d0b15b0@692.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["vaccines.json",new URL("./files/data.json",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
      md`# La marque du véhicule acheté selon l'âge du client`
  )});
  main.variable(observer()).define(["legend","color","margin"], function(legend,color,margin){return(
      legend({
        color,
        title: "Nombre de voitures achetées",
        marginLeft: margin.left,
        width: 360
      })
  )});
  main.variable(observer("chart")).define("chart", ["height","data","d3","width","margin","x","y","color","format"], function(height,data,d3,width,margin,x,y,color,format)
      {
        const innerHeight = height * data.names.length;

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, innerHeight + margin.top + margin.bottom])
            .style("font", "10px sans-serif");

        svg.append("g")
            .attr("transform", `translate(0,${margin.top})`)
            .call(d3.axisTop(x).ticks(null, "d"))
            .call(g => g.select(".domain").remove());

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).tickSize(0))
            .call(g => g.select(".domain").remove());

        svg.append("g")
            .attr("transform", `translate(0,${innerHeight + margin.top + 4})`)
            .call(d3.axisBottom(x)
                .tickValues([data.year])
                .tickFormat(String)
                .tickSize(-innerHeight - 10))
            .call(g => g.select(".tick text")
                .clone()
                .attr("dy", "2em")
                .style("font-weight", "bold")
                .text(""))
            .call(g => g.select(".domain").remove());

        const row = svg.append("g")
            .selectAll("g")
            .data(data.values)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${y(data.names[i])})`);

        row.selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", (d, i) => x(data.years[i]) + 1)
            .attr("width", (d, i) => x(data.years[i] + 1) - x(data.years[i]) - 1)
            .attr("height", y.bandwidth() - 1)
            .attr("fill", d => isNaN(d) ? "#eee" : d === 0 ? "#fff" : color(d))
            .append("title")
            .text((d, i) => `${format(d)} voitures achetées à ${data.years[i]} ans`);

        return svg.node();
      }
  );
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
      d3.scaleSequentialSqrt([0, d3.max(data.values, d => d3.max(d))], d3.interpolatePuRd)
  )});
  main.variable(observer("margin")).define("margin", function(){return(
      {top: 20, right: 1, bottom: 40, left: 40}
  )});
  main.variable(observer("height")).define("height", function(){return(
      16
  )});
  main.variable(observer("format")).define("format", ["d3"], function(d3)
      {
        const f = d3.format(",d");
        return d => isNaN(d) ? "N/A cases"
            : d === 0 ? "0"
                : d < 1 ? "<1"
                    : d < 1.5 ? "1"
                        : `${f(d)}`;
      }
  );
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
      d3.scaleLinear()
          .domain([d3.min(data.years), d3.max(data.years) + 1])
          .rangeRound([margin.left, width - margin.right])
  )});
  main.variable(observer("y")).define("y", ["d3","data","margin","height"], function(d3,data,margin,height){return(
      d3.scaleBand()
          .domain(data.names)
          .rangeRound([margin.top, margin.top + data.names.length * height])
  )});
  main.variable(observer("data")).define("data", ["FileAttachment","d3"], async function(FileAttachment,d3)
      {
        const names = ["Audi", "BMW", " Dacia", "Daihastsu", "Fiat", "Ford", "Jaguar", "Kia", "Lancia", "Mercedes", "Mini", "Nissan", "Peugeot", "Renault", "Saab", "Seat", "Skoda", "Volkswagen", "Volvo"];
        const data = await FileAttachment("vaccines.json").json();
        const values = [];
        const year0 = d3.min(data[0].data.values.data, d => d[0]);
        const year1 = d3.max(data[0].data.values.data, d => d[0]);
        const years = d3.range(year0, year1 + 1);
        for (const [year, i, value] of data[0].data.values.data) {
          if (value == null) continue;
          (values[i] || (values[i] = []))[year - year0] = value;
        }
        return {
          values,
          names,
          years
        };
      }
  );
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
      require("d3@5")
  )});
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  return main;
}
