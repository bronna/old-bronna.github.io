<script>
    import {
      csv,
      autoType,
      scaleLinear,
      extent,
      lineRadial,
      groups,
      curveCatmullRom,
    } from 'd3'
  
    let data = []
    csv(
      'https://raw.githubusercontent.com/higsch/data/main/daily_surface_temperatures/daily_surface_temperatures.csv',
      autoType,
    ).then((d) => (data = d))
  
    const angleScale = scaleLinear()
      .domain([1, 366])
      .range([0, 2 * Math.PI])
  
    let width = 100
    let height = 100
  
    $: minDim = Math.min(width, height);
    $: radiusScale = scaleLinear()
      .domain(extent(data, (d) => d.value))
      .range([(0.1 * minDim) / 1.7, minDim / 1.8])
  
    // $: opacityScale = scaleLinear()
    //   .domain([1940, 2024])
    //   .range([0.1, 0.2])
  
    const lineGenerator = lineRadial()
      .angle((d) => d.angle)
      .radius((d) => d.radius)
      .curve(curveCatmullRom)
  
    $: dataByYear = groups(
      data.filter((d) => d.value !== 'NA'),
      (d) => d.year,
    ).map(([year, data]) => {
      const renderedData = data.map((d) => {
        return {
          ...d,
          angle: angleScale(d.day_of_year),
          radius: radiusScale(d.value),
        }
      })
      return {
        year,
        renderedData,
        opacity: [2023, 2024].includes(year)
          ? 1.0
          : 0.2,
      }
    })
</script>

<div class="svg-container">
    <svg viewBox="0 0 {width} {height}">
        <!-- <g>
            <circle cx="0" cy="0" r={width / 2} fill="white" opacity="0.2" />
        </g> -->
        <g>
            {#each dataByYear as { year, renderedData, opacity }}
              <path
                d={lineGenerator(renderedData)}
                {opacity}
                stroke={year === 2024
                  ? 'violet'
                  : year === 2023
                    ? 'steelblue'
                    : 'steelblue'}
                stroke-width={[2023, 2024].includes(year)
                  ? 0.4
                  : 0.2}
              />
            {/each}
        </g>
    </svg>
</div>

<style>
    .svg-container {
        width: 70vw;
        height: auto;
        position: absolute;
        bottom: -50%;
        /* right: 0%; */
        left: 25rem;
        z-index: -1;
        overflow: hidden;
    }

    svg {
      width: 100%;
      height: 100%;
      opacity: 0.65;
    }

    g {
        transform: translate(50%, 50%);
    }

    path {
      fill: none;
      stroke-linecap: round;
    }
</style>
