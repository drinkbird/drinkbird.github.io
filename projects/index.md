---
#layout: page
#title: Projects
#permalink: /projects/
#hidden: true
---

{% for post in site.posts %}
    {% if post.categories contains 'projects' %}
  <article class="article-list">
      <h2><a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a></h2>
      <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
  </article>
    {% endif %}
{% endfor %}