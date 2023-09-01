---
layout: post
title: "Consolidating front-end asset processing in ASP.NET projects"
excerpt: "Apply modern Building techniques to any version of ASP.NET"
permalink: /consolidating-front-end-asset-processing-aspnet/
comments: true
categories: blog
featured: true
mermaid: true
image:
  feature: build-process.png
reads:
  - aspnetmvc5
  - csharpindepth
  - jsgoodparts
  - codecomplete
  - agileppp
  - cleancode
  - pragmaticprogrammer
  - refactoring
  - gofdp
  - hfdesignpatterns
  - refactoring
  - thecleancoder
  - softskills
  - legacycode
  - effectiveusecases
  - userstoriesapplied
---

With modern web applications involving a considerable number of moving parts, it's only natural for software teams to often experience pain and friction; bug lists grow out of control, new features get delayed, maintenance becomes a nightmare.

At least for ASP.NET projects, it turns out that a large number of such problems can often be traced back to front-end assets, specifically scripts and stylesheets. Why is this pattern so common and what can we do to address it?

# Front-end assets are first-class citizens

The typical approach to developing ASP.NET applications indicates that our number one priority should always be back-end functionality. We tend to put as much logic as possible at the server side, and only involve client side assets whenever we have no other choice.

Unfortunately, we fail to realize that we now live in an *evergreen web*. Browsers have evolved to powerful programmable platforms, thus shifting chunks of functionality from the server to the client can significantly transform user experience and add immense value to an application.

Even when we choose to involve front-end assets as little as possible, since our delivery mechanism of choice is the Web, we **do** have to involve them, and they still play a vital role to our application's correctness. Yet, for some reason we still fail to treat them as what they really are, and that is *first-class citizens*.

# A half-baked Build pipeline

We can easily verify whether a project treats its front-end assets as first-class citizens, by taking a look at its Build pipeline. The Build is supposed to act as a parachute, verifying the project's correctness and preventing defective code from being shipped.

Yet, the Build pipeline of most ASP.NET projects is solely focused on just processing and testing server side assets, leaving front-end resources completely out of the loop, thus **assuming** that their state is always correct. Such a half-baked approach cannot be trusted!

This is how the typical approach looks like on a developer's machine:

<div class="mermaid">
graph TD;
    vs[Visual Studio]-->MSBuild;
    MSBuild-->csc[C# Compiler];
    csc[C# Compiler]-- Generate -->comp(( Compilation output ));
    MSBuild-->testrunner[C# Test Runner];
    testrunner[C# Test Runner]-. Verify .->comp(( Compilation output ));
</div>

and this is how the same approach looks like on a Build server:

<div class="mermaid">
graph TD;
    vs[Build Service]-- Get Revision -->vc[Version Control];
    vs[Build Service]-- Get Packages -->nu[NuGet];
    vs[Build Service]-->MSBuild;
    MSBuild-->csc[C# Compiler];
    csc[C# Compiler]-- Generate -->comp(( Compilation output ));
    MSBuild-->testrunner[C# Test Runner];
    testrunner[C# Test Runner]-. Verify .->comp(( Compilation output ));
    pub(Publish)-- Include -->comp(( Compilation output ));
    vs[Build Service]-->pub(Publish)
    pub(Publish)-- Generate -->art(( Deliverables ))
</div>

Obviously your actual approach may be much different from this one, but the goal here is to emphasize the lack of actions related to front-end resource processing and verification.

# Visual Studio plugins don't cut it

Some teams choose to assign the responsibility of processing front-end resources to a number of Visual Studio plugins, a seemingly practical approach that quickly falls short as a team grows. It requires that every single team member is using the exact same plugins of the exact same version in the exact same way, in order to avoid inconsistencies, and that's simply unrealistic.

Don't be mistaken, Visual Studio plugins can be proven extremely useful in a wide number of situations. We just need to avoid relying on plugins for producing deliverables. Also, some popular processing tools simply do not exist in the form of a Visual Studio plugin.

Most importantly, by generating the processed version of your resources that way, you don't have a choice but to add both the original and the processed files to source control. That's is an anti-pattern you need to avoid, just like you avoid adding *bin* and *obj* folders of your .NET project. *Build results stay out of source control!*

# The Goal

What we really need is a modular, fully-customizable, self-contained, generic and reusable Build pipeline for compiling, processing, testing and packaging all parts of a web application. We need to be able to put this pipeline into action on new environments, either development machines or Build servers, in a matter of seconds. We also need to keep the pipeline's configuration in sync between these environments at all times.

On top of that, the pipeline should handle different Build *definitions* (e.g. Debug/Release) and produce different results, depending on the chosen definition. That what we already do for back-end assets, we just need to extend the pipeline to handle front-end asset processing in a similar fashion.

This is how the initial Build pipeline should look like, after its transformation, on a developer’s machine:

<div class="mermaid">
graph TD
    vs[Visual Studio]-->front(Process/Verify Client Assets);
    front(Process/Verify Client Assets)-->cli((Client Assets));
    style front stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
    style cli stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
    vs[Visual Studio]-->MSBuild;
    MSBuild-- Include -->cli((Client Assets));
    MSBuild-->csc[C# Compiler];
    csc[C# Compiler]-- Generate -->comp(( Compilation output ));
    MSBuild-->testrunner[C# Test Runner];
    testrunner[C# Test Runner]-. Verify .->comp(( Compilation output ));
</div>

and this is how the same approach should look like on a Build server:

<div class="mermaid">
graph TD;
    vs[Build Service]-- Get Revision -->vc[Version Control];
    vs[Build Service]-- Get Packages -->nu["NuGet / ..."];
    vs[Visual Studio]-->front(Process/Verify Client Assets);
    front(Process/Verify Client Assets)-->cli((Client Assets));
    style front stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
    style cli stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
    style nu stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
    vs[Build Service]-->MSBuild;
    MSBuild-- Include -->cli((Client Assets));
    MSBuild-->csc[C# Compiler];
    csc[C# Compiler]-- Generate -->comp(( Compilation output ));
    MSBuild-->testrunner[C# Test Runner];
    testrunner[C# Test Runner]-. Verify .->comp(( Compilation output ));
    pub(Publish)-- Include -->comp(( Compilation output ));
    vs[Build Service]-->pub(Publish)
    pub(Publish)-- Generate -->art(( Deliverables ))
</div>

# Front-end asset processing types

Let's have a look at the most common types of front-end asset processing used in web applications today.

## Linting

The process of running a tool to analyze code for potential errors is called *linting*. *Lint* was the original name of a tool used to analyze C code, but nowadays we have linters for many different types of code. In web applications, we use linters for both scripts and stylesheets.

## Minification

*Minification* (or *Uglification*) is the process of removing all unnecessary characters from source code (typically in CSS and JavaScript files) without changing its functionality. These characters include comments, line breaks and whitespace. Our goal is to reduce the size of front-end assets before serving them to the client, so that applications load faster and consume less bandwidth. For JavaScript files, this process also includes the concept of *mangling*, which is the act of reducing names of local variables and functions, usually to single-letters.

## Bundling

*Bundling* is the process of combining a number of JavaScript or CSS files together, so that can be retrieved from the browser with a single HTTP request. This technique further minimizes the loading time of web applications.

## JavaScript Module Bundling

In contrast to the standard bundling described above, a *module bundler* tool walks through the JavaScript module (*) dependency graph, combines all relevant files into a single bundle, and also includes some extra logic into it, to make handle module loading autonomously.

### JavaScript modules (*)

Managing the dependency graph between various JavaScript files in a manual fashion has proven to be extremely error-prone, fragile, counter-productive and non-scalable. Since JavaScript does not natively support the concept of modules, at least up to version *ES5 Strict*, the Industry has come up with a number of non-native module definitions in order to address this problem.

The most prominent ones are *AMD*, a standard for asynchronous modules, and *CommonJS*, a standard for synchronous ones. Also, *ES6*, the next version of JavaScript is just around the corner, and comes with native support for modularization.

## Metalanguages and Transpiling

It's a fact that neither JavaScript or CSS were initially designed for such scale. The browser evolution has definitely helped those language grow, but there are still numerous
issues and missing features that can significantly slow down the development process. Especially for large-scale projects, maintainability and extensibility of scripts and stylesheets can be proven to be extremely challenging.

The Industry has responded to this problem by introducing a number of *metalanguages*, also known as *preprocessors*. Some of them introduce a completely new syntax, and others act as a superset of their base language. For JavaScript, the most popular ones are [TypeScript](https://www.typescriptlang.org/), [CoffeeScript](http://coffeescript.org/), [LiveScript](http://livescript.net/) [Babel](https://babeljs.io/). For CSS, there is [SASS](http://sass-lang.com/), [LESS](http://lesscss.org/) and [Stylus](http://stylus-lang.com/), to name a few.

Of course it's not mandatory to use a metalanguage, but it's highly recommended to pick one of each category and use it **consistently** throughout your project. Also, these tools have come a long way, and the final code they produce is, in most cases, cleaner and faster than what we could write ourselves.

Any code written in a metalanguage needs to be converted to JavaScript or CSS respectively, since that's all the browser can understand. The process of running a tool to convert the source code of a metalanguage to source code of another language is called *transpiling*.

## Source Mapping

The next question is, how can we debug code written in a metalanguage, on the browser? During the transpilation process, we can additionally produce a set of files called *source maps*. When the browser detects a source map, hides the transpiled file and lets work as if the metalanguage source was directly used. 

In fact, source maps are not limited to mapping one-to-one transpiled files. We can use them to map minified CSS/JavaScript to their full readable version, and even map a minified bundle to the full readable versions of its included files.

Also, instead of putting source map data into separate files, we can instead append it to the end of the transpiled files directly.

Finally, the creation process of source maps should only be triggered in Development mode. Production environments shouldn't know anything about the original files.

## Testing

Last but not least, we should be verifying that our scripts behave as intended. By splitting our functionality into distinct modules and having a good separation of concerns, our scripts can be highly testable and we can avoid shipping defective code. We have numerous tools to help us achieve that, from JavaScript testing frameworks and test runners, to headless browsers.

Testing isn't something to be taken lightly. JavaScript code needs to be tested as thoroughly as C# code, or in fact any other code. It's a big topic that deserves some posts of its own, so I won't get into details here.

# A use case

The processing types above are the most common ones, but there are many others as well.

Let's suppose our project's scripts are written in TypeScript, and our stylesheets in SASS. We need to transpile those resources, bundle them, generate source maps, and also verify their correctness through a number of automated tests.

In terms of implementation, a popular choice is a number NodeJS-based tools, acquired and installed through the NPM package manager. We can find at least one tool per processing type within the NPM official repository. What's great about NPM tooling is that we only need NodeJS installed in the Build environment. By having a *package.json* file within our project's directory, listing the required packages for processing our resources, it's only a matter of executing the `npm install` command to have the Build process ready to roll.

To orchestrate these processing types, we can use a build system similar to MSBuild, called *Gulp*, and Gulp's equivalent of targets are called *tasks*. Both Visual Studio 2013 and 2015 support a featured called *Task Runner Explorer*, which is perfectly compatible with Gulp tasks. We can use that feature to include front-end processing into the Build pipeline. Here is how that pipeline would look like on a development environment:

<div class="mermaid">
graph TD;
    vs[Visual Studio]-- Before Build -->tr[Task Runner];
    tr[Task Runner]-->Gulp;
    Gulp-->lint(Lint SASS/TypeScript);
    lint(Lint SASS/TypeScript)-.->transpile(Transpile SASS/TypeScript);
    transpile(Transpile SASS/TypeScript)-- If Debug -->sourcemap(Generate Source Maps);
    sourcemap(Generate Source Maps)-->bundle(Bundle CSS/JavaScript);
    bundle(Bundle CSS/JavaScript)-- If Release -->uglify(Uglify CSS/JavaScript);
    uglify(Uglify CSS/JavaScript)-->cdel(( Client Deliverables ));
    Gulp-->jstestrunner[JavaScript Test Runner];
    jstestrunner[JavaScript Test Runner]-. Verify .->cdel(( Client Assets ));
    MSBuild-- Include -->cdel(( Client Assets ));
    vs[Visual Studio]-->MSBuild;
    MSBuild-->csc[C# Compiler];
    csc[C# Compiler]-- Generate -->comp(( Compilation output ));
    MSBuild-->testrunner[C# Test Runner];
    testrunner[C# Test Runner]-. Verify .->comp(( Compilation output ));
</div>

As for the build server, we can just include a command-line call to Gulp, e.g. `gulp build`, as part of our build's definition. Here's how the same pipeline would look like on the build server:

<div class="mermaid">
graph TD;
    vs[Build Service]-- Get Revision -->vc[Version Control];
    vs[Build Service]-- Get Packages -->nu[NuGet & NPM];
    vs[Build Service]-->Gulp;
    Gulp-->lint(Lint SASS/TypeScript);
    lint(Lint SASS/TypeScript)-.->transpile(Transpile SASS/TypeScript);
    transpile(Transpile SASS/TypeScript)-- If Debug -->sourcemap(Generate Source Maps);
    sourcemap(Generate Source Maps)-->bundle(Bundle CSS/JavaScript);
    bundle(Bundle CSS/JavaScript)-- If Release -->uglify(Uglify CSS/JavaScript);
    uglify(Uglify CSS/JavaScript)-->cdel(( Client Deliverables ));
    Gulp-->jstestrunner[JavaScript Test Runner];
    jstestrunner[JavaScript Test Runner]-. Verify .->cdel(( Client Assets ));
    MSBuild-- Include -->cdel(( Client Assets ));
    vs[Build Service]-->MSBuild;
    MSBuild-->csc[C# Compiler];
    csc[C# Compiler]-- Generate -->comp(( Compilation output ));
    MSBuild-->testrunner[C# Test Runner];
    testrunner[C# Test Runner]-. Verify .->comp(( Compilation output ));
    pub(Publish)-- Include -->comp(( Compilation output ));
    vs[Build Service]-->pub(Publish)
    pub(Publish)-- Generate -->art(( Deliverables ))
</div>

ASP.NET Core and onwards will use a very similar approach, and in fact, nowadays the NodeJS runtime gets installed as part of Visual Studio's installation. Also, at the moment Gulp is the default task runner for front-end resource processing in ASP.NET Core project templates.

The good news is that you don't have to wait until you upgrade your project's ASP.NET version to Core in order to start handling your front-end resources properly; You can do it today!

I will get into specifics on how to create Gulp tasks and invoke the required tooling within them in another article. Until then, feel free to post questions and thoughts in the comments section below, or in any of the social media. Take care and happy building!
