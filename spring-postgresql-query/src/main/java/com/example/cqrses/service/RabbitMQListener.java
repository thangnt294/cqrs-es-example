package com.example.cqrses.service;

import com.example.cqrses.constant.AppConstants;
import com.example.cqrses.dto.ItemEventDTO;
import com.example.cqrses.dto.ItemEventDataDTO;
import com.example.cqrses.entity.Item;
import com.example.cqrses.repository.ItemRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RabbitMQListener {

    private final ItemRepository itemRepository;

    private static final Logger logger = LoggerFactory.getLogger(RabbitMQListener.class);

    @RabbitListener(queues = "item_queue")
    public void itemEventListener(ItemEventDTO itemEventDTO) {
        ItemEventDataDTO data = itemEventDTO.getData();

        logger.info("Consuming event " + data.getEventType() + " with item " + data.getName() + " at " + data.getTimestamp());

        switch(data.getEventType()) {
            case AppConstants.EventType.ITEM_CREATED:
                createItem(data);
                break;
            case AppConstants.EventType.ITEM_DISPATCHED:
                dispatchItem(data);
                break;
            case AppConstants.EventType.ITEM_RESTOCKED:
                restockItem(data);
                break;
            case AppConstants.EventType.ITEM_DELETED:
                deleteItem(data);
                break;
            default:
                break;
        }
    }

    private void createItem(ItemEventDataDTO data) {
        Optional<Item> optionalItem = itemRepository.findById(data.getItemId());

        if (optionalItem.isEmpty()) {
            Item item = new Item(data.getItemId(), data.getName(), data.getQuantity());
            itemRepository.save(item);
            logger.info("SUCCESS: Created new item " + data.getItemId() + " with name " + data.getName() + " and quantity " + data.getQuantity());
        } else {
            logger.info("ERROR: Cannot create new item. An item already exists with id " + data.getItemId());
        }
    }

    private void dispatchItem(ItemEventDataDTO data) {
        Optional<Item> optionalItem = itemRepository.findById(data.getItemId());

        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            Integer oldQuantity = item.getQuantity();
            Integer newQuantity = Math.max(item.getQuantity() - data.getQuantity(), 0);
            item.setQuantity(newQuantity);
            itemRepository.save(item);
            logger.info("SUCCESS: Dispatched item " + data.getItemId() + " with name " + data.getName() + " with quantity from " + oldQuantity + " to " + newQuantity);
        } else {
            logger.error("ERROR: No item found with id " + data.getItemId());
        }
    }

    private void restockItem(ItemEventDataDTO data) {
        Optional<Item> optionalItem = itemRepository.findById(data.getItemId());

        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            Integer oldQuantity = item.getQuantity();
            Integer newQuantity = item.getQuantity() + data.getQuantity();
            item.setQuantity(newQuantity);
            itemRepository.save(item);
            logger.info("SUCCESS: Restocked item " + data.getItemId() + " with name " + data.getName() + " with quantity from " + oldQuantity + " to " + newQuantity);
        } else {
            logger.error("ERROR: No item found with id " + data.getItemId());
        }
    }

    private void deleteItem(ItemEventDataDTO data) {
        Optional<Item> optionalItem = itemRepository.findById(data.getItemId());
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            itemRepository.deleteById(data.getItemId());
            logger.info("SUCCESS: Deleted item " + data.getItemId() + " with name " + item.getName() + " and quantity " + item.getQuantity());
        } else {
            logger.error("ERROR: No item found with id " + data.getItemId());
        }

    }
}
