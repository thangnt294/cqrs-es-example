package com.example.cqrses.service;

import com.example.cqrses.dto.ItemDTO;
import com.example.cqrses.repository.ItemRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    private final ModelMapper modelMapper;

    @Override
    public List<ItemDTO> findAll() {
        return itemRepository.findAll().stream().map(item -> modelMapper.map(item, ItemDTO.class)).collect(Collectors.toList());
    }
}
