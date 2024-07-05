---
layout: default2
---

## Temporal Observation


<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.2/js/components/accordion.min.js"></script>
<ul class="uk-accordion">
    <li>
        <a class="uk-accordion-title" href>Test</a>
        <div class="uk-accordion-content">
            Hallo
        </div>
    </li>
    <li>
        <a class="uk-accordion-title" href>Test</a>
        <div class="uk-accordion-content">
            Hallo
        </div>
    </li>
    <li>
        <a class="uk-accordion-title" href>Test</a>
        <div class="uk-accordion-content">
            Hallo
        </div>
    </li>
</ul>


<div class="uk-container uk-margin-medium">
    <svg id="groupedBox" width="800px" height="700px"></svg>
</div>

<script>
    grouped_box_plot("js/all_queries_domains_with_ranks_and_snapshots_small.csv", "#groupedBox", "h1 Word Count");
    
</script>