package com.aibot.aibotspringboot.controller;

import com.aibot.aibotspringboot.common.Result;
import com.aibot.aibotspringboot.entity.Menu;
import com.aibot.aibotspringboot.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;
    @GetMapping("/list")
    public Result list(@RequestParam String roleId){
        List list = menuService.lambdaQuery().like(Menu::getMenuRight,roleId).list();
        return Result.success(list);
    }
}

