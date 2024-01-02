package com.example.bwfchat.repository;

import com.example.bwfchat.entity.SystemInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SystemInfoRepository extends JpaRepository<SystemInfo,Long> {

    @Query(nativeQuery = true,value = "SELECT * from msgs.system_info ORDER BY msgs.system_info.id DESC OFFSET :page limit :limit")
    List<SystemInfo> findAll(@Param("page") int page, @Param("limit") int limit);
    long countSystemInfoByProfileId(long profileId);

    SystemInfo findByUuid(String uuid);
}
