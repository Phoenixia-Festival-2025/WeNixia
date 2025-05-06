package com.cloud.phoenixia.service;

import com.cloud.phoenixia.dto.BoothRequestDTO;
import com.cloud.phoenixia.dto.BoothResponseDTO;
import com.cloud.phoenixia.model.Booth;
import com.cloud.phoenixia.model.BoothPoster;
import com.cloud.phoenixia.model.BoothStatus;
import com.cloud.phoenixia.repository.BoothPosterRepository;
import com.cloud.phoenixia.repository.BoothRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoothService {

    private final BoothRepository boothRepository;
    private final BoothPosterRepository boothPosterRepository;

    public Booth createFromDTO(BoothRequestDTO dto) {
        Booth booth = Booth.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .status(BoothStatus.valueOf(dto.getStatus()))
                .locationNumber(dto.getLocationNumber())
                .imageUrl(dto.getImageUrl() != null ? dto.getImageUrl()
                        : "https://phoenixia-static-assets.s3.ap-northeast-2.amazonaws.com/default.png")
                .build();

        Booth saved = boothRepository.save(booth);

        // ✅ 포스터 저장
        if (dto.getPosterUrls() != null && !dto.getPosterUrls().isEmpty()) {
            List<BoothPoster> posters = dto.getPosterUrls().stream()
                    .filter(url -> url != null && !url.trim().isEmpty()) // 💡 null 방지
                    .map(url -> {
                        BoothPoster poster = BoothPoster.builder()
                                .imageUrl(url)
                                .booth(saved)
                                .build();
                        System.out.println("🎨 저장할 포스터 URL: " + poster.getImageUrl()); // ✅ 로깅
                        return poster;
                    })
                    .toList();

            boothPosterRepository.saveAll(posters);
            saved.setPosters(posters); // optional, 단방향만 쓰는 경우 생략 가능
        }

        return saved;
    }

    public List<BoothResponseDTO> getAll() {
        return boothRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public Optional<BoothResponseDTO> findById(Long id) {
        return boothRepository.findById(id).map(this::convertToDTO);
    }

    public BoothResponseDTO updateFromDTO(Long id, BoothRequestDTO dto) {
        return boothRepository.findById(id)
                .map(booth -> {
                    booth.setName(dto.getName());
                    booth.setDescription(dto.getDescription());
                    booth.setStatus(BoothStatus.valueOf(dto.getStatus()));
                    booth.setLocationNumber(dto.getLocationNumber());

                    String imageUrl = dto.getImageUrl();
                    if (imageUrl == null || imageUrl.trim().isEmpty()) {
                        imageUrl = "https://phoenixia-static-assets.s3.ap-northeast-2.amazonaws.com/default.png";
                    }
                    booth.setImageUrl(imageUrl);

                    Booth updated = boothRepository.save(booth);

                    // ✅ 포스터 업데이트 (기존 삭제 후 재등록)
                    if (dto.getPosterUrls() != null) {
                        boothPosterRepository.deleteAll(updated.getPosters());
                        List<BoothPoster> newPosters = dto.getPosterUrls().stream()
                                .map(url -> BoothPoster.builder()
                                        .imageUrl(url)
                                        .booth(updated)
                                        .build())
                                .toList();
                        boothPosterRepository.saveAll(newPosters);
                        updated.setPosters(newPosters);
                    }

                    return convertToDTO(updated);
                })
                .orElseThrow(() -> new IllegalArgumentException("Booth not found"));
    }

    public void delete(Long id) {
        boothRepository.deleteById(id);
    }

    private BoothResponseDTO convertToDTO(Booth booth) {
        String imageUrl = booth.getImageUrl();
        if (imageUrl == null || imageUrl.trim().isEmpty()) {
            imageUrl = "https://phoenixia-static-assets.s3.ap-northeast-2.amazonaws.com/default.png";
        }

        List<String> posterUrls = booth.getPosters() != null ?
                booth.getPosters().stream()
                        .map(BoothPoster::getImageUrl)
                        .toList()
                : new ArrayList<>();

        return BoothResponseDTO.builder()
                .id(booth.getId())
                .name(booth.getName())
                .description(booth.getDescription())
                .status(booth.getStatus())
                .locationNumber(booth.getLocationNumber())
                .imageUrl(imageUrl)
                .posterUrls(posterUrls)  // ✅ 추가
                .build();
    }
}