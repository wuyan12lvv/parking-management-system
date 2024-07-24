package com.aibot.aibotspringboot.controller;

import com.aibot.aibotspringboot.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    private AIService aiService;

    @PostMapping("/sendMessage")
    public String sendMessage(@RequestBody String message) {
        // 调用AI服务发送消息并返回响应
        return aiService.sendMessageToAI(message);
    }

}