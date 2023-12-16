package com.example.bwfchat.entity;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Reaction {
    private String uuid;
    private String reaction;
    private List<String> users;
    private long counter;
    public static List<Reaction> toObject(String json){
        Gson gson = new Gson();
        return gson.fromJson(json,new TypeToken<List<Reaction>>(){}.getType());
    }

    public static List<Reaction> reactionList(){
        return new ArrayList<>(List.of(
                new Reaction("1","react1",new ArrayList<String>(),0l),
                new Reaction("2","react2",new ArrayList<String>(),0l)
        ));
    }
}
