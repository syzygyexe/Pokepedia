package com.borisov.alexander.pokepedia.model;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "pokelist")
public class Pokemon implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable = false, updatable = false)
    private Long id;
    @Column(name="name", nullable=false, length=512)
    private String name;
    @Column(name="height", nullable=false, length=512)
    private int height;
    @Column(name="weight", nullable=false, length=512)
    private int weight;
    @Column(name="type", nullable=false, length=512)
    private String type;
    @Column(name="imageUrl", nullable=false, length=512)
    private String imageUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHeight() { return height * 10; }

    public void setHeight(int height) {
        this.height = height;
    }

    public double getWeight() {
        return (double) weight / 10;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Pokemon{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", height=" + height +
                ", weight=" + weight +
                ", type='" + type + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
