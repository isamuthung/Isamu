---
layout: projects
title: "Tangible Interface for Data Exploration"
subtitle: "Making complex climate data physically manipulable for collaborative analysis"
date: 2024-11-10
client: "Environmental Research Institute"
role: "Interaction Designer / Fabrication Lead"
tools: ["Arduino", "Processing", "Fusion 360", "Laser Cutting", "3D Printing"]
banner_image: "/assets/images/projects/dl24.jpg"
featured_image: "/assets/images/projects/tangible-interface-hero.jpg"
featured_caption: "Research team using the tangible interface to visualize precipitation pattern changes"
gallery:
  - url: "/assets/images/projects/tangible1.jpg"
    caption: "The complete system showing physical controls and visualization display"
  - url: "/assets/images/projects/tangible2.jpg"
    caption: "Detail of the modular token system representing different data variables"
  - url: "/assets/images/projects/tangible3.jpg"
    caption: "Internal component layout showing sensor arrangement"
  - url: "/assets/images/projects/tangible4.jpg"
    caption: "User testing session with climate scientists evaluating the interface"
related_projects:
  - title: "Data Sonification Project"
    url: "/projects/data-sonification"
  - title: "Interactive Museum Installation"
    url: "/projects/interactive-museum"
---

## Project Overview

Climate researchers at the Environmental Research Institute faced challenges in collaboratively exploring multidimensional datasets. Traditional screen-based tools limited group interaction and made it difficult to intuitively manipulate multiple variables simultaneously. This project aimed to create a tangible interface that would make data exploration more intuitive, collaborative, and accessible.

## Design Challenge

The key challenges this project addressed were:

1. **Collaboration barriers**: Conventional data visualization tools typically support single-user interaction, limiting group analysis
2. **Cognitive load**: Screen-based interfaces often require navigating complex menus, distracting from the data itself
3. **Simultaneous variable manipulation**: Climate data involves numerous interrelated variables that are difficult to adjust concurrently using conventional interfaces
4. **Accessibility**: Highly technical interfaces created barriers for non-technical stakeholders who needed to engage with the research

## Solution

The designed solution is a hybrid physical-digital system consisting of:

### Physical Interface Components

- **Interactive surface**: A 120×80cm sensing table that detects the position, orientation, and type of physical tokens
- **Variable tokens**: A set of 15 physical objects representing different data parameters (temperature, precipitation, wind patterns, etc.)
- **Modifier discs**: Smaller elements that can be placed alongside tokens to adjust their parameters or set constraints
- **Timeline slider**: A tangible control for navigating temporal dimensions of the data
- **Selection tools**: Physical tools for marking and saving specific data states or selections

<figure class="projects-image-container">
  <img src="/assets/images/projects/token-detail.jpg" alt="Close-up of variable tokens" class="projects-image">
  <figcaption class="projects-image-caption">The variable tokens are color-coded by data category with tactile elements that make them distinguishable by touch.</figcaption>
</figure>

### Digital Components

- **Projection system**: High-definition visuals projected directly onto the table surface surrounding the physical elements
- **Recognition software**: Custom computer vision system that tracks the position and state of all physical components
- **Visualization engine**: Real-time rendering system that responds instantly to physical manipulations
- **Data export tools**: Mechanisms for capturing states and exporting findings to conventional research tools

### Interaction Model

The system supports a fluid interaction model where:

1. Users place variable tokens on the surface to select which data dimensions to display
2. Rotating tokens adjusts the weighting or importance of each variable
3. Positioning tokens relative to each other creates relationships between variables
4. Modifier discs alter how variables are processed or visualized
5. The timeline slider allows temporal exploration while maintaining the selected variable relationships
6. Multiple users can simultaneously manipulate different aspects of the visualization

## Development Process

The project was developed through a highly collaborative process over six months:

1. **Discovery workshops** with researchers to understand their specific data challenges
2. **Prototype iterations** testing different physical form factors and sensing technologies
3. **Visualization design** explorations to determine the most effective ways to represent complex climate data
4. **Technical development** of the custom tracking system and visualization engine
5. **Fabrication** of the final physical components using sustainable materials
6. **User testing** with climate scientists, policy makers, and educational groups

## Technical Implementation

The system uses several integrated technologies:

- **Tracking system**: Infrared camera array with fiducial markers on the base of each token
- **Processing engine**: Custom software built in Processing for visualization rendering
- **Fabrication**: Combination of FSC-certified wood, bioplastics, and recycled aluminum
- **Electronics**: Arduino-based capacitive sensing for token state detection

## Results 

The tangible interface has been in use for eight months with significant impacts on the research team's work:

- **Collaboration increase**: Group analysis sessions increased by 45%
- **Insight generation**: Teams reported a 30% increase in new research questions generated during exploration sessions
- **Stakeholder engagement**: Non-technical stakeholders showed 60% greater engagement with research findings
- **Learning curve**: New team members reported understanding complex data relationships in approximately half the time compared to traditional tools

> "The ability to physically manipulate variables has transformed how we approach multivariate analysis. We're seeing patterns and asking questions that simply didn't emerge with our previous tools." — Dr. Elena Reyes, Lead Climate Researcher

## Future Development

Based on user feedback, several enhancements are planned:

1. Adding haptic feedback to provide additional data information through touch
2. Developing a more portable version for field research and educational outreach
3. Creating an API to allow the system to work with a wider range of data types
4. Implementing remote collaboration features to connect multiple physical interfaces across different locations
